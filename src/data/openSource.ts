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
  closesIssue?: { number: number; url: string };
}

export interface OpenSourceProject {
  name: string;
  language?: string;
  description?: string;
  repositoryUrl?: string;
  logoUrl?: string;
  stars?: number;
  forks?: number;
  contributions: Contribution[];
  loading?: boolean;
}

export interface TrackedRepo {
  owner: string;
  repo: string;
  name?: string;
  language?: string;
  description?: string;
  logoUrl?: string;
  stars?: number;
  forks?: number;
}

export const GITHUB_USERNAME = "Martell0x1";

export const trackedRepos: TrackedRepo[] = [
  {
    owner: "muhammadyusufpov",
    repo: "hyper",
    name: "Hyper",
    language: "Rust",
    description: "A Rust-based programming language with an interpreter and a compile/JIT path.",
    logoUrl: "https://github.com/github.png",
  },
  {
    owner: "tokio-rs",
    repo: "topcoat",
    name: "Topcoat",
    language: "Rust",
    description: "A batteries-included framework for building full-stack web apps.",
    logoUrl: "https://i.ytimg.com/vi/VCgUmW6WzsI/maxresdefault.jpg",
  },
  {
    owner: "gabime",
    repo: "spdlog",
    name: "spdlog",
    language: "C++",
    description: "A very fast, header-only C++ logging library.",
    logoUrl: "https://i-blog.csdnimg.cn/direct/34bab29729e44e8ebf8be8a48fb9ed91.png",
  },
  {
    owner: "uutils",
    repo: "coreutils",
    name: "coreutils",
    language: "Rust",
    description: "Cross-platform Rust rewrite of the GNU coreutils.",
    logoUrl: "https://blog.desdelinux.net/wp-content/uploads/2022/05/GNU-Coreutils.png",
  },
];

export const repoUrl = (owner: string, repo: string) =>
  `https://github.com/${owner}/${repo}`;

export const HYPER_REPO = "https://github.com/muhammadyusufpov/hyper";

export interface RawPull {
  number: number;
  title: string;
  body: string | null;
  state: "open" | "closed";
  merged_at: string | null;
  html_url: string;
  user: { login: string };
  base: { repo: { name: string; html_url: string; language: string | null } };
  labels: PRLabel[];
}

const issueReferenceRegex = /(?:close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved)\s+#(\d+)/gi;

export const mapPull = (p: RawPull): Contribution => {
  const closesIssue = (() => {
    if (!p.body) return undefined;
    const match = issueReferenceRegex.exec(p.body);
    if (!match) return undefined;
    const number = parseInt(match[1], 10);
    return { number, url: `${p.base.repo.html_url}/issues/${number}` };
  })();

  return {
    title: p.title,
    prNumber: p.number,
    prUrl: p.html_url,
    status: p.state === "open" ? "open" : p.merged_at ? "merged" : "closed",
    labels: p.labels ?? [],
    ...(closesIssue ? { closesIssue } : {}),
  };
};
