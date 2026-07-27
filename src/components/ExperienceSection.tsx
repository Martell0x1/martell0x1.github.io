import { Briefcase, Calendar, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

import {diceLogo} from "@/assets/dice.png";

interface Experience {
  role: string;
  company: string;
  project?: string;
  period: string;
  location: string;
  status?: string;
  bullets: string[];
}

const EXPERIENCES: Experience[] = [
  {
    role: "Backend Engineering Intern",
    company: "Dice Marketing & Advertising",
    companyLogo: diceLogo,
    project: "Spread Social Platform",
    period: "May 2026 – August 2026",
    location: "Hybrid",
    status: "Completed",
    bullets: [
      "Engineered 40+ production REST APIs across analytics, competitor intelligence, scheduling, authentication, and media management for a large-scale social media management platform.",
      "Architected a competitor intelligence pipeline spanning 7 social networks with 30+ scraping consumers, collecting and normalizing 200+ engagement metrics into MongoDB and ClickHouse for analytics.",
      "Built distributed asynchronous workflows using Laravel Queues, Redis, Horizon, WebSockets, Ayrshare, and Apify, enabling scalable background processing, caching, rate limiting, and real-time event delivery.",
      "Optimized a production scheduler executing 2,000+ background jobs every 30 minutes, improving worker throughput, reducing redundant processing, and increasing infrastructure resource utilization."
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

        <div className="max-w-4xl mx-auto space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
              <Card className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-md hover:border-primary/50 transition-all duration-500 hover:shadow-glow">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <CardContent className="relative p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
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
                      <Badge variant="outline" className="border-primary/50 text-primary bg-primary/5">
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
                      <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                        <span className="text-primary mt-1">▹</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
