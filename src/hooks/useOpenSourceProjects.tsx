import { createContext, useContext, type ReactNode } from "react";
import { trackedRepos, repoUrl, type OpenSourceProject } from "@/data/openSource";

interface State {
  projects: OpenSourceProject[];
  error: string | null;
}

const OpenSourceContext = createContext<State | undefined>(undefined);

// Build the project list from locally maintained static data. No GitHub API
// requests are made at runtime, so the page renders immediately.
const buildProjects = (): OpenSourceProject[] =>
  trackedRepos
    .map((t) => ({
      name: t.name ?? t.repo!,
      language: t.language,
      description: t.description,
      repositoryUrl: t.owner && t.repo ? repoUrl(t.owner, t.repo) : undefined,
      logoUrl: t.logoUrl,
      stars: t.stars,
      forks: t.forks,
      contributions: t.contributions ?? [],
      loading: false,
    }))
    .sort((a, b) => {
      const starsDiff = (b.stars ?? 0) - (a.stars ?? 0);
      if (starsDiff !== 0) return starsDiff;
      return (b.forks ?? 0) - (a.forks ?? 0);
    });

export const OpenSourceProjectsProvider = ({ children }: { children: ReactNode }) => {
  const state: State = { projects: buildProjects(), error: null };
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
