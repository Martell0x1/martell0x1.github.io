export type ContributionStatus = "merged" | "open" | "closed";

export interface Contribution {
  title: string;
  description?: string;
  prNumber?: number;
  prUrl?: string;
  status?: ContributionStatus;
}

export interface OpenSourceProject {
  name: string;
  language?: string;
  description?: string;
  repositoryUrl?: string;
  contributions: Contribution[];
}

const HYPER_REPO = "https://github.com/muhammadyusufpov/hyper";

export const openSourceProjects: OpenSourceProject[] = [
  {
    name: "Hyper",
    language: "Rust",
    description: "A Rust-based programming language with an interpreter and a compile/JIT path.",
    repositoryUrl: HYPER_REPO,
    contributions: [
      {
        title: "Collection methods on the interpreter path",
        description:
          "Added list/array methods (len, append) and dict methods (len, keys) to the interpreter, with arity and unknown-method runtime errors, in-place mutation on append, and a runnable example.",
        prNumber: 23,
        prUrl: `${HYPER_REPO}/pull/23`,
        status: "merged",
      },
      {
        title: "Collection methods lowered on the compile path",
        description:
          "Lowered len/append/keys through hyper_rt_coll_* so JIT and --emit-exe match the interpreter, with compile-time arity checks and a new CI test.",
        prNumber: 24,
        prUrl: `${HYPER_REPO}/pull/24`,
        status: "merged",
      },
      {
        title: "Improved error messages for module imports",
        description: "Clearer diagnostics when a module import fails to resolve.",
        prNumber: 41,
        prUrl: `${HYPER_REPO}/pull/41`,
        status: "closed",
      },
      {
        title: "CLI --version flag",
        description:
          "Added a --version flag to the Hyper CLI so `cargo run -- --version` and `hyper --version` report the release version.",
        prNumber: 35,
        prUrl: `${HYPER_REPO}/pull/35`,
        status: "closed",
      },
      {
        title: "CONTRIBUTING.md documentation",
        description:
          "Wrote detailed contribution documentation in the project root to help new contributors get started.",
        prNumber: 34,
        prUrl: `${HYPER_REPO}/pull/34`,
        status: "closed",
      },
    ],
  },
];
