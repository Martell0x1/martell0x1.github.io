import { Server, Cpu, Terminal, Database, Cloud, Wrench } from "lucide-react";
import SkillCard from "./SkillCard";

const SkillsSection = () => {
  const skills = [
    {
      icon: Server,
      title: "Backend Development",
      description: "Building robust APIs and microservices with a focus on performance, scalability, and clean architecture.",
      technologies: ["Node.js", "Python", "Go", "REST", "GraphQL", "gRPC"],
    },
    {
      icon: Cpu,
      title: "Embedded & IoT",
      description: "Developing firmware and IoT solutions for embedded systems, sensors, and connected devices.",
      technologies: ["C/C++", "Arduino", "ESP32", "Raspberry Pi", "MQTT", "Bluetooth"],
    },
    {
      icon: Terminal,
      title: "Linux & Systems",
      description: "Deep experience with Linux internals, shell scripting, and systems administration.",
      technologies: ["Linux", "Bash", "Systemd", "Kernel", "Networking", "Security"],
    },
    {
      icon: Database,
      title: "Databases",
      description: "Designing and optimizing database schemas for both relational and NoSQL databases.",
      technologies: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "TimescaleDB"],
    },
    {
      icon: Cloud,
      title: "DevOps & Cloud",
      description: "Deploying and managing applications with modern CI/CD pipelines and cloud infrastructure.",
      technologies: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Terraform"],
    },
    {
      icon: Wrench,
      title: "Tools & Practices",
      description: "Following best practices with version control, testing, and documentation.",
      technologies: ["Git", "Jest", "Pytest", "Swagger", "Markdown", "Agile"],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built over years of hands-on experience with various technologies and paradigms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.title}
              {...skill}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
