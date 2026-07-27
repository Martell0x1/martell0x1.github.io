import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";
import awsFilesharing from "@/assets/aws-filesharing-preview.jpg";
import rustyKernel from "@/assets/rusty-kernel-preview.jpg";

type ProjectCategory = "Backend" | "IoT" | "Systems";
type FilterId = "All" | ProjectCategory;

interface Project {
  title: string;
  description: string;
  tags: string[];
  categories: ProjectCategory[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

const FILTERS: FilterId[] = ["All", "Backend", "IoT", "Systems"];

const projects: Project[] = [
  {
    title: "Monitex — Event-Driven IoT Monitoring & Anomaly Detection",
    description:
      "Event-driven platform ingesting real-time ESP32 sensor telemetry over MQTT, bridged through RabbitMQ into an ASP.NET Core backend with a live Angular dashboard. Integrated a Python anomaly-detection model and cut environment setup time by 80% with a Dockerized one-click deployment.",
    tags: ["ASP.NET Core", "Rust (ESP32)", "RabbitMQ", "MQTT", "PostgreSQL", "Angular", "Python"],
    categories: ["IoT", "Backend"],
    githubUrl: "https://github.com/Martell0x1/Monitex",
    imageUrl: "https://raw.githubusercontent.com/Martell0x1/Monitex/master/assets/arch.png",
  },
  {
    title: "VisionGate — Smart IoT Garage Access System (AI/ML)",
    description:
      "Smart garage-entry system that scans license plates via camera for automated access, combining a NestJS backend, ESP32 firmware, and a Flutter mobile app. YOLO + OpenCV + EasyOCR pipeline reaches 95% detection accuracy.",
    tags: ["NestJS", "Flutter", "ESP32", "MQTT", "YOLO", "OpenCV", "Docker", "Azure"],
    categories: ["IoT"],
    githubUrl: "https://github.com/Martell0x1/VisionGate",
    imageUrl: "https://raw.githubusercontent.com/Martell0x1/VisionGate/master/assets/system.jpeg",
  },
  {
    title: "Rusty-x86_64 — Bare-Metal Rust OS Kernel",
    description:
      "Bare-metal x86_64 kernel in Rust from scratch, implementing paging, custom heap allocators, and GDT/IDT interrupt handling. 100% successful boot cycles on QEMU with kernel-level unit tests; 15% memory footprint reduction via custom allocator design.",
    tags: ["Rust", "x86_64", "QEMU", "OS Development", "Bare Metal"],
    categories: ["Systems"],
    githubUrl: "https://github.com/Martell0x1/rusty-x86-64",
    imageUrl: rustyKernel,
  },
  {
    title: "FileShare — Cloud File Sharing Web App",
    description:
      "Team-based cloud file-sharing app (Node.js/Express, vanilla JS) integrated with AWS S3, EC2, IAM, and VPC, supporting multi-file uploads with shareable download links. Least-privilege IAM policies and Free Tier optimization cut hosting costs 25% with 99% uptime in testing.",
    tags: ["Node.js", "Express", "AWS S3", "EC2", "IAM", "VPC"],
    categories: ["Backend"],
    githubUrl: "https://github.com/Martell0x1/File-Sharing-Application-AWS",
    imageUrl: awsFilesharing,
  },
];

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<FilterId>("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of projects showcasing my expertise in backend
              development, embedded systems, and infrastructure.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-glow"
                    : "bg-card/60 text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground"
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filtered.map((project, index) => (
            <ScrollReveal
              key={project.title}
              animation="fade-up"
              delay={index * 80}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                imageUrl={project.imageUrl}
              />
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
