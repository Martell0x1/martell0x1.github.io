import type { ReactNode } from "react";
import { Calendar, MapPin, Code2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import diceLogo from "@/assets/dice-logo.png";

interface Experience {
  role: string;
  company: string;
  project?: string;
  period: string;
  location: string;
  status?: "Current" | "Completed" | string;
  logo?: string;
  logoAlt?: string;
  bullets: ReactNode[];
}

const EXPERIENCES: Experience[] = [
  {
    role: "Backend Engineering Intern",
    company: "Dice Marketing & Advertising",
    project: "Spread Social Platform",
    period: "May 2026 – August 2026",
    location: "Hybrid",
    status: "Completed",
    logo: diceLogo,
    logoAlt: "Dice Marketing & Advertising logo",
    bullets: [
      <>
        Engineered backend services for a production-scale social media management and analytics platform, contributing{" "}
        <strong className="text-foreground font-semibold">106+ commits</strong>,{" "}
        <strong className="text-foreground font-semibold">19k+ LOC</strong>, and{" "}
        <strong className="text-foreground font-semibold">40+ REST APIs</strong> across analytics, scheduling, media management, authentication, and competitor intelligence.
      </>,
      <>
        Architected a cross-platform competitor intelligence pipeline spanning{" "}
        <strong className="text-foreground font-semibold">7 social networks</strong>, implementing{" "}
        <strong className="text-foreground font-semibold">30+ scraping consumers</strong> and processing{" "}
        <strong className="text-foreground font-semibold">200+ social metrics</strong> per competitor into{" "}
        <strong className="text-foreground font-semibold">MongoDB</strong> and{" "}
        <strong className="text-foreground font-semibold">ClickHouse</strong> for low-latency analytics and historical reporting.
      </>,
      <>
        Built distributed asynchronous workflows using Laravel Queues,{" "}
        <strong className="text-foreground font-semibold">Redis</strong>, Horizon,{" "}
        <strong className="text-foreground font-semibold">WebSockets</strong>,{" "}
        <strong className="text-foreground font-semibold">Ayrshare</strong>, and{" "}
        <strong className="text-foreground font-semibold">Apify</strong>, including queue orchestration,{" "}
        <strong className="text-foreground font-semibold">rate limiting</strong>, caching, background synchronization, and real-time event delivery.
      </>,
      <>
        Optimized a production scheduler executing{" "}
        <strong className="text-foreground font-semibold">2,000+ background jobs every 30 minutes</strong>, reducing redundant queue execution, improving worker throughput, and increasing infrastructure resource utilization under sustained production workloads.
      </>,
    ],
  },
  {
    role: "Coding Instructor",
    company: "ElCoder",
    project: "Backend Development Track",
    period: "Sep 2023 – May 2024",
    location: "Alexandria, Egypt",
    status: "Completed",
    bullets: [
      <>
        Taught backend development courses focused on{" "}
        <strong className="text-foreground font-semibold">Node.js</strong>, APIs, and practical software engineering fundamentals for university and school students.
      </>,
      <>
        Mentored learners through hands-on projects, code reviews, and problem-solving sessions, helping them build confidence shipping real applications.
      </>,
      <>
        Supported ElCoder&apos;s nonprofit mission by running workshops and community sessions that make computer science education more accessible.
      </>,
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">&gt;_</span> Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Where I've been shipping code.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="absolute left-[1.15rem] top-8 bottom-8 w-px bg-gradient-to-b from-primary via-primary/50 to-primary/20 md:left-[1.4rem]"
            aria-hidden
          />

          <div className="space-y-0">
            {EXPERIENCES.map((exp, idx) => {
              const isCompleted = exp.status === "Completed";
              const isCurrent = exp.status === "Current";
              const isLast = idx === EXPERIENCES.length - 1;

              return (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
                  <div className={cn("relative flex gap-4 md:gap-6", !isLast && "pb-8")}>
                    <div className="relative z-10 flex flex-col items-center shrink-0 pt-6">
                      <div
                        className={cn(
                          "w-6 h-6 md:w-7 md:h-7 rounded-full border-2 bg-gradient-card flex items-center justify-center transition-shadow",
                          isCompleted &&
                            "border-primary shadow-[0_0_16px_hsl(var(--primary)/0.55)] animate-glow",
                          isCurrent &&
                            "border-primary/70 shadow-[0_0_12px_hsl(var(--primary)/0.35)]",
                          !isCompleted && !isCurrent && "border-primary/40"
                        )}
                      >
                        <span
                          className={cn(
                            "w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-primary",
                            (isCompleted || isCurrent) && "animate-pulse"
                          )}
                        />
                      </div>
                    </div>

                    <Card
                      className={cn(
                        "group relative flex-1 overflow-hidden border-border/50 bg-gradient-card backdrop-blur-md transition-all duration-500",
                        isCompleted
                          ? "border-primary/50 shadow-glow animate-glow"
                          : "hover:border-primary/40 hover:shadow-glow"
                      )}
                    >
                      <div
                        className={cn(
                          "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/40 origin-left transition-transform duration-500",
                          isCompleted || isCurrent
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        )}
                      />

                      {isCompleted && (
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
                      )}

                      <CardContent className="relative p-6 space-y-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "shrink-0 p-2 rounded-xl bg-primary/10 overflow-hidden transition-all duration-300",
                              isCompleted &&
                                "ring-1 ring-primary/40 shadow-[0_0_20px_hsl(var(--primary)/0.35)]"
                            )}
                          >
                            {exp.logo ? (
                              <img
                                src={exp.logo}
                                alt={exp.logoAlt ?? `${exp.company} logo`}
                                className="w-10 h-10 object-contain rounded-lg"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                                <Code2 className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                              {exp.role}
                            </h3>
                            <p className="text-muted-foreground text-sm mt-1">
                              {exp.company}
                              {exp.project && (
                                <>
                                  {" · "}
                                  <span className="text-foreground/80">{exp.project}</span>
                                </>
                              )}
                            </p>
                          </div>
                          {exp.status && (
                            <Badge
                              variant="outline"
                              className={cn(
                                "shrink-0 inline-flex items-center",
                                isCompleted
                                  ? "border-primary text-primary bg-primary/10 shadow-glow animate-glow"
                                  : isCurrent
                                    ? "border-primary/60 text-primary bg-primary/5"
                                    : "border-primary/50 text-primary bg-primary/5"
                              )}
                            >
                              {(isCompleted || isCurrent) && (
                                <span className="mr-1.5 inline-block w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)),0_0_14px_hsl(var(--primary)/0.7)] animate-pulse" />
                              )}
                              {exp.status}
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 text-primary/70" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 text-primary/70" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        <ul className="space-y-2 border-t border-border/50 pt-4">
                          {exp.bullets.map((b, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                            >
                              <span className="text-primary mt-1">▹</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
