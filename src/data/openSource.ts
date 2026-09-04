export type ContributionStatus = "merged" | "open" | "closed";

export interface PRLabel {
  name: string;
  color: string;
}

export interface Contribution {
  title: string;
  prNumber?: number;
  prUrl?: string;
  status?: ContributionStatus;
  labels?: PRLabel[];
}

export interface OpenSourceProject {
  name: string;
  language?: string;
  description?: string;
  repositoryUrl?: string;
  contributions: Contribution[];
  loading?: boolean;
}

export interface TrackedRepo {
  owner: string;
  repo: string;
  name?: string;
  language?: string;
  description?: string;
}

export const GITHUB_USERNAME = "Martell0x1";

export const trackedRepos: TrackedRepo[] = [
  {
    owner: "muhammadyusufpov",
    repo: "hyper",
    name: "Hyper",
    language: "Rust",
    description: "A Rust-based programming language with an interpreter and a compile/JIT path.",
  },
];

export const repoUrl = (owner: string, repo: string) =>
  `https://github.com/${owner}/${repo}`;

export const HYPER_REPO = "https://github.com/muhammadyusufpov/hyper";

export interface RawPull {
  number: number;
  title: string;
  state: "open" | "closed";
  merged_at: string | null;
  html_url: string;
  user: { login: string };
  base: { repo: { name: string; html_url: string; language: string | null } };
  labels: PRLabel[];
}

export const mapPull = (p: RawPull): Contribution => ({
  title: p.title,
  prNumber: p.number,
  prUrl: p.html_url,
  status: p.state === "open" ? "open" : p.merged_at ? "merged" : "closed",
  labels: p.labels ?? [],
});
