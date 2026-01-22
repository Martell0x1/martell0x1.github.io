import ProjectCard from "./ProjectCard";

const ProjectsSection = () => {
  const projects = [
    {
      title: "IoT Monitoring Platform",
      description: "A real-time monitoring system for IoT devices with data visualization, alerting, and device management capabilities.",
      tags: ["Python", "MQTT", "TimescaleDB", "React", "Docker"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Embedded Sensor Network",
      description: "Custom firmware for ESP32-based sensors with mesh networking, low-power optimization, and OTA updates.",
      tags: ["C++", "ESP32", "FreeRTOS", "Bluetooth", "WiFi"],
      githubUrl: "https://github.com",
    },
    {
      title: "Linux System Monitor",
      description: "A lightweight system monitoring tool written in Rust with terminal UI for tracking system resources and processes.",
      tags: ["Rust", "Linux", "TUI", "Systems Programming"],
      githubUrl: "https://github.com",
    },
    {
      title: "API Gateway Service",
      description: "High-performance API gateway with rate limiting, authentication, caching, and comprehensive logging.",
      tags: ["Go", "Redis", "PostgreSQL", "gRPC", "Kubernetes"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Home Automation Hub",
      description: "Self-hosted home automation system running on Raspberry Pi with custom hardware integrations.",
      tags: ["Python", "Raspberry Pi", "MQTT", "Docker", "Zigbee"],
      githubUrl: "https://github.com",
    },
    {
      title: "Database Migration Tool",
      description: "CLI tool for managing database migrations with support for multiple database engines and rollback capabilities.",
      tags: ["Node.js", "TypeScript", "PostgreSQL", "CLI"],
      githubUrl: "https://github.com",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing my expertise in backend development, embedded systems, and infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
