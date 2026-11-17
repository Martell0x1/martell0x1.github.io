import { useEffect, useState, createContext, useContext, type ReactNode } from "react";
import {
  GITHUB_USERNAME,
  trackedRepos,
  mapPull,
  repoUrl,
  type OpenSourceProject,
  type RawPull,
} from "@/data/openSource";

const PER_PAGE = 100;
const REQUEST_TIMEOUT_MS = 30000;
const MAX_PULL_PAGES = 5;
const RETRY_DELAY_MS = 1500;

interface State {
  projects: OpenSourceProject[];
  error: string | null;
}

interface RepoResult {
  project: OpenSourceProject;
  error: string | null;
}

const OpenSourceContext = createContext<State | undefined>(undefined);

// GitHub unauthenticated requests are limited to 60/hr. A personal access token
// raises this to 5,000/hr. Set VITE_GITHUB_TOKEN in .env (public_repo scope).
// Create a token at https://github.com/settings/tokens
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

function githubFetch(url: string, timeoutMs = REQUEST_TIMEOUT_MS) {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }
  return fetch(url, { headers, signal: AbortSignal.timeout(timeoutMs) }).then(async (r) => {
    if (!r.ok) {
      const body = await r.text().catch(() => "");
      throw new Error(
        `GitHub API ${r.status} ${r.statusText}${body ? ": " + body.slice(0, 200) : ""}`
      );
    }
    return r.json();
  });
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Fetch one repo, retrying once on transient failure (timeout / 403 / 5xx).
const loadRepo = async (
  t: (typeof trackedRepos)[number],
  attempt = 1,
): Promise<RepoResult> => {
  const base = `https://api.github.com/repos/${t.owner}/${t.repo}`;
  const baseProject = {
    name: t.name ?? t.repo,
    language: t.language,
    description: t.description,
    repositoryUrl: t.owner && t.repo ? repoUrl(t.owner, t.repo) : undefined,
    logoUrl: t.logoUrl,
    contributions: [] as ReturnType<typeof mapPull>[],
    loading: false,
  };

  // Hardcoded contributions (e.g. mailing-list / patch-series contributions)
  // are used directly without hitting the GitHub API.
  if (t.contributions && t.contributions.length > 0) {
    return {
      project: {
        ...baseProject,
        stars: t.stars,
        forks: t.forks,
        contributions: t.contributions,
      },
      error: null,
    };
  }

  const pulls: RawPull[] = [];
  try {
    for (let page = 1; page <= MAX_PULL_PAGES; page++) {
      const batch = (await githubFetch(
        `${base}/pulls?state=all&per_page=${PER_PAGE}&page=${page}`
      )) as RawPull[];
      pulls.push(...batch);
      if (batch.length < PER_PAGE) break;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const retryable =
      attempt === 1 &&
      (message.includes("timed out") || message.includes("403") || message.includes("5"));
    if (retryable) {
      await sleep(RETRY_DELAY_MS);
      return loadRepo(t, 2);
    }
    return {
      project: { ...baseProject },
      error: `Failed to load ${t.repo}: ${message}`,
    };
  }

  const mine = pulls.filter((p) => p.user?.login === GITHUB_USERNAME);

  let stars: number | undefined;
  let forks: number | undefined;
  try {
    const meta = await githubFetch(base);
    stars = meta.stargazers_count;
    forks = meta.forks_count;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const retryable =
      attempt === 1 &&
      (message.includes("timed out") || message.includes("403") || message.includes("5"));
    if (retryable) {
      await sleep(RETRY_DELAY_MS);
      return loadRepo(t, 2);
    }
    return {
      project: { ...baseProject, contributions: mine.map(mapPull) },
      error: `Failed to load ${t.repo} metadata: ${message}`,
    };
  }

  return {
    project: { ...baseProject, stars, forks, contributions: mine.map(mapPull) },
    error: null,
  };
};

export const OpenSourceProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<State>({
    projects: trackedRepos.map((t) => ({
      name: t.name ?? t.repo,
      language: t.language,
      description: t.description,
      repositoryUrl: t.owner && t.repo ? repoUrl(t.owner, t.repo) : undefined,
      logoUrl: t.logoUrl,
      contributions: [],
      loading: true,
    })),
    error: null,
  });

  useEffect(() => {
    let active = true;

    // Repos are loaded sequentially (one after another) instead of all at once.
    // This avoids exhausting the browser's per-host connection pool and
    // bursting GitHub's rate limit, which caused timeouts on this page.
    (async () => {
      const results: RepoResult[] = [];
      for (const t of trackedRepos) {
        if (!active) break;
        results.push(await loadRepo(t));
        // Small gap between repos to be gentle on the rate limit.
        if (active && t !== trackedRepos[trackedRepos.length - 1]) {
          await sleep(400);
        }
      }
      if (!active) return;

      const errors = results.map((r) => r.error).filter(Boolean) as string[];
      const projects = results.map((r) => r.project).sort((a, b) => {
        const starsDiff = (b.stars ?? 0) - (a.stars ?? 0);
        if (starsDiff !== 0) return starsDiff;
        return (b.forks ?? 0) - (a.forks ?? 0);
      });
      setState({ projects, error: errors.length ? errors.join("; ") : null });
    })();

    return () => {
      active = false;
    };
  }, []);

  return <OpenSourceContext.Provider value={state}>{children}</OpenSourceContext.Provider>;
};

export const useOpenSourceProjects = (): State => {
  const context = useContext(OpenSourceContext);
  if (!context) {
    throw new Error(
      "useOpenSourceProjects must be used within OpenSourceProjectsProvider"
    );
  }
  return context;
};
