import ProjectCard from "./ProjectCard";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Rusty x86-64 OS Kernel",
      description: "A bare-metal Rust operating system kernel for x86_64 with VGA output, interrupts, paging, hardware support, and custom memory allocators.",
      tags: ["Rust", "x86_64", "OS Development", "Bare Metal", "Systems Programming"],
      githubUrl: "https://github.com/Martell0x1/rusty-x86-64",
    },
    {
      title: "VisionGate",
      description: "Smart IoT Garage System with AI/ML integration for intelligent access control and automation using Flutter and embedded systems.",
      tags: ["Dart", "Flutter", "IoT", "AI/ML", "ESP32"],
      githubUrl: "https://github.com/Martell0x1/VisionGate",
    },
    {
      title: "Rusty Tasks",
      description: "A lightweight CLI task manager built in Rust with color-coded statuses, UUIDs for unique identification, and table-based rendering.",
      tags: ["Rust", "CLI", "Task Manager", "Terminal"],
      githubUrl: "https://github.com/Martell0x1/rusty-tasks",
    },
    {
      title: "LED Controller ESP32",
      description: "Minimal web application to toggle LED on/off via ESP32 microcontroller with embedded web server and WiFi connectivity.",
      tags: ["C++", "ESP32", "IoT", "Embedded", "Web Server"],
      githubUrl: "https://github.com/Martell0x1/LED-Controller-ESP32",
    },
    {
      title: "File Sharing App (AWS)",
      description: "Simple File Sharing Web Application integrated with AWS services including S3 for storage and Lambda for serverless processing.",
      tags: ["HTML", "AWS", "S3", "Lambda", "Cloud"],
      githubUrl: "https://github.com/Martell0x1/File-Sharing-Application-AWS",
    },
    {
      title: "Express.js RESTful API",
      description: "Basic Express.js RESTful API demonstrating routing, middlewares, authentication/authorization, user roles, MongoDB, and CRUD operations.",
      tags: ["Node.js", "Express", "MongoDB", "REST API", "Auth"],
      githubUrl: "https://github.com/Martell0x1/ExpressJs-Basic-RestfullAPI-Project",
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
