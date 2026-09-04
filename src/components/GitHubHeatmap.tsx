import { useEffect, useState } from "react";

interface Day {
  date: string;
  count: number;
  level: number;
}

const levelClass = [
  "bg-muted/40",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/70",
  "bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.7)]",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const GitHubHeatmap = ({ username = "Martell0x1" }: { username?: string }) => {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("failed"))))
      .then((data) => {
        if (!active) return;
        setDays(data.contributions ?? []);
        setTotal(data.total?.lastYear ?? null);
      })
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, [username]);

  if (failed) return null;

  const weeks: Day[][] = [];
  if (days) {
    let week: Day[] = [];
    days.forEach((d, i) => {
      const dow = new Date(d.date).getUTCDay();
      if (i === 0 && dow > 0) week = Array(dow).fill(null) as unknown as Day[];
      week.push(d);
      if (dow === 6) {
        weeks.push(week);
        week = [];
      }
    });
    if (week.length) weeks.push(week);
  }

  return (
    <section className="rounded-xl border border-border bg-card/70 p-6">
      <header className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h2 className="text-lg font-semibold text-foreground">Contribution Activity</h2>
        <span className="text-xs font-mono text-muted-foreground">
          {total !== null ? `${total} contributions in the last year` : "loading…"}
        </span>
      </header>

      <div className="overflow-x-auto pb-2">
        <div className="inline-flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, di) => {
                const d = week[di];
                if (!d) return <div key={di} className="w-[10px] h-[10px]" />;
                return (
                  <div
                    key={di}
                    title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
                    className={`w-[10px] h-[10px] rounded-[2px] ${levelClass[d.level] ?? levelClass[0]}`}
                  />
                );
              })}
            </div>
          ))}
          {!days &&
            Array.from({ length: 53 }).map((_, wi) => (
              <div key={`s${wi}`} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, di) => (
                  <div key={di} className="w-[10px] h-[10px] rounded-[2px] bg-muted/30 animate-pulse" />
                ))}
              </div>
            ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2 text-[11px] font-mono text-muted-foreground">
        <span>Less</span>
        {levelClass.map((c, i) => (
          <span key={i} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />
        ))}
        <span>More</span>
      </div>
      <span className="sr-only">{MONTHS.join(" ")}</span>
    </section>
  );
};

export default GitHubHeatmap;
