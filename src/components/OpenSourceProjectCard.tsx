import { ExternalLink, Github, GitPullRequest } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Contribution, OpenSourceProject } from "@/data/openSource";

const statusLabel: Record<string, string> = {
  merged: "Merged",
  open: "Open",
  closed: "Closed",
};

const statusClass: Record<string, string> = {
  merged: "border-primary/40 text-primary bg-primary/10",
  open: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
  closed: "border-muted-foreground/30 text-muted-foreground bg-muted/40",
};

const ContributionRow = ({ item }: { item: Contribution }) => (
  <li className="rounded-lg border border-border/60 bg-background/40 p-4">
    <div className="flex items-start gap-2">
      <GitPullRequest className="w-4 h-4 mt-1 text-primary shrink-0" />
      <div className="min-w-0 space-y-2">
        <h4 className="font-medium text-foreground leading-snug">{item.title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.description ?? (
            <span className="italic opacity-70">Description coming soon.</span>
          )}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          {item.status ? (
            <Badge
              variant="outline"
              className={cn("font-mono text-[11px]", statusClass[item.status])}
            >
              {statusLabel[item.status]}
            </Badge>
          ) : (
            <Badge variant="outline" className="font-mono text-[11px] text-muted-foreground">
              Status pending
            </Badge>
          )}
          <span className="text-muted-foreground">
            {item.prNumber ? `PR #${item.prNumber}` : "PR number pending"}
          </span>
          {item.prUrl && (
            <a
              href={item.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              View PR <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  </li>
);

const OpenSourceProjectCard = ({ project }: { project: OpenSourceProject }) => (
  <article className="rounded-xl border border-border bg-card/70 p-6 hover:border-primary/30 transition-colors">
    <header className="flex flex-wrap items-baseline justify-between gap-2">
      <h2 className="text-2xl font-semibold text-foreground">{project.name}</h2>
      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
        {project.language && <span>{project.language}</span>}
        {project.contributions.length > 0 && (
          <span>
            {project.contributions.length}{" "}
            {project.contributions.length === 1 ? "contribution" : "contributions"}
          </span>
        )}
      </div>
    </header>

    <p className="mt-2 text-muted-foreground leading-relaxed">
      {project.description ?? (
        <span className="italic opacity-70">Project description coming soon.</span>
      )}
    </p>

    {project.contributions.length > 0 ? (
      <>
        <h3 className="mt-6 mb-3 text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Contributions
        </h3>
        <ul className="space-y-3">
          {project.contributions.map((c) => (
            <ContributionRow key={c.title} item={c} />
          ))}
        </ul>
      </>
    ) : (
      <p className="mt-6 text-sm italic text-muted-foreground opacity-70">
        Contributions will be added soon.
      </p>
    )}

    {project.repositoryUrl && (
      <a
        href={project.repositoryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        <Github className="w-4 h-4" />
        View Repository
        <ExternalLink className="w-3 h-3" />
      </a>
    )}
  </article>
);

export default OpenSourceProjectCard;
