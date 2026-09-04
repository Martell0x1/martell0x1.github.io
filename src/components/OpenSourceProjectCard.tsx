import { ExternalLink, Github, GitPullRequest } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Contribution, ContributionStatus, OpenSourceProject } from "@/data/openSource";

const statusLabel: Record<string, string> = {
  merged: "Merged",
  open: "Open",
  closed: "Closed after maintainer discussion",
};

const statusClass: Record<string, string> = {
  merged: "badge-status-merged",
  open: "badge-status-open",
  closed: "badge-status-closed",
};

const dotClass: Record<ContributionStatus, string> = {
  merged: "status-dot-merged",
  open: "status-dot-open",
  closed: "status-dot-closed",
};

const statusOrder: ContributionStatus[] = ["open", "merged", "closed"];

const summaryLabel: Record<ContributionStatus, string> = {
  merged: "Merged",
  open: "Open",
  closed: "Closed",
};

const StatusSummary = ({ contributions }: { contributions: Contribution[] }) => {
  if (contributions.length === 0) return null;
  const count = (s: ContributionStatus) =>
    contributions.filter((c) => c.status === s).length;
  const total = contributions.length;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="text-muted-foreground">
        Total: <span className="font-semibold text-foreground">{total}</span>
      </span>
      {statusOrder.map((s) => (
        <span key={s} className="flex items-center gap-1.5">
          <span className={cn("status-dot", dotClass[s])} />
          <span>{count(s)} {summaryLabel[s]}</span>
        </span>
      ))}
    </div>
  );
};

const ContributionRow = ({ item }: { item: Contribution }) => (
  <li className="rounded-lg border border-border/60 bg-background/40 p-4">
    <div className="flex items-start gap-2">
      <GitPullRequest className="w-4 h-4 mt-1 text-primary shrink-0" />
      <div className="min-w-0 space-y-2">
        <h4 className="font-medium text-foreground leading-snug">{item.title}</h4>
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
          {item.labels && item.labels.length > 0 && (
            <>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-px bg-border" aria-hidden />
                {item.labels.map((l) => (
                  <span
                    key={l.name}
                    className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] leading-none"
                    style={{
                      backgroundColor: `#${l.color}29`,
                      borderColor: `#${l.color}80`,
                      color: `#${l.color}`,
                    }}
                  >
                    {l.name}
                  </span>
                ))}
              </span>
            </>
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

const OpenSourceProjectCard = ({ project }: { project: OpenSourceProject }) => {
  const visible = project.loading
    ? []
    : project.contributions.filter((c) => c.status !== "closed");

  return (
    <article className="rounded-xl border border-border bg-card/70 p-6 hover:border-primary/30 transition-colors">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-semibold text-foreground">{project.name}</h2>
        <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
          {project.language && <span>{project.language}</span>}
          <StatusSummary contributions={project.contributions} />
        </div>
      </header>

    <p className="mt-2 text-muted-foreground leading-relaxed">
      {project.description ?? (
        <span className="italic opacity-70">Project description coming soon.</span>
      )}
    </p>

    {project.loading ? (
      <p className="mt-6 text-sm italic text-muted-foreground opacity-70">
        Loading contributions…
      </p>
    ) : visible.length > 0 ? (
      <>
        <h3 className="mt-6 mb-3 text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Contributions
        </h3>
        <ul className="space-y-3">
          {visible.map((c) => (
            <ContributionRow key={c.prNumber ?? c.title} item={c} />
          ))}
        </ul>
      </>
    ) : (
      <p className="mt-6 text-sm italic text-muted-foreground opacity-70">
        No open or merged contributions right now.
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
};

export default OpenSourceProjectCard;
