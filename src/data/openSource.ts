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

export const openSourceProjects: OpenSourceProject[] = [
  {
    name: "Hyper",
    language: "Rust",
    description: "A Rust-based programming language.",
    contributions: [
      {
        title: "Collection methods for lists and dictionaries",
        description:
          "Implemented built-in collection methods for the language's list and dictionary types.",
        status: "merged",
      },
      {
        title: "Contributing documentation",
        description:
          "Added project contribution documentation to help new contributors get started.",
        status: "merged",
      },
    ],
  },
];
