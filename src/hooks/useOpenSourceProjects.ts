import { useEffect, useState } from "react";
import {
  GITHUB_USERNAME,
  trackedRepos,
  mapPull,
  repoUrl,
  type OpenSourceProject,
  type RawPull,
} from "@/data/openSource";

const PER_PAGE = 100;

interface State {
  projects: OpenSourceProject[];
  error: string | null;
}

export const useOpenSourceProjects = (): State => {
  const [state, setState] = useState<State>({
    projects: trackedRepos.map((t) => ({
      name: t.name ?? t.repo,
      language: t.language,
      description: t.description,
      repositoryUrl: repoUrl(t.owner, t.repo),
      contributions: [],
      loading: true,
    })),
    error: null,
  });

  useEffect(() => {
    let active = true;

    Promise.all(
      trackedRepos.map(async (t) => {
        const base = `https://api.github.com/repos/${t.owner}/${t.repo}`;
        const pulls: RawPull[] = [];
        for (let page = 1; page <= 5; page++) {
          const r = await fetch(
            `${base}/pulls?state=all&per_page=${PER_PAGE}&page=${page}`,
            { signal: AbortSignal.timeout(15000) }
          );
          if (!r.ok) throw new Error(`Failed to load ${t.repo}`);
          const batch = (await r.json()) as RawPull[];
          pulls.push(...batch);
          if (batch.length < PER_PAGE) break;
        }
        const mine = pulls.filter((p) => p.user?.login === GITHUB_USERNAME);

        return {
          name: t.name ?? t.repo,
          language: t.language,
          description: t.description,
          repositoryUrl: repoUrl(t.owner, t.repo),
          contributions: mine.map(mapPull),
          loading: false,
        } as OpenSourceProject;
      })
    )
      .then((projects) => active && setState({ projects, error: null }))
      .catch((err) => active && setState((s) => ({ ...s, error: err.message })));

    return () => {
      active = false;
    };
  }, []);

  return state;
};
