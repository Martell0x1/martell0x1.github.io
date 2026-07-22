import { Code2, Layers, Database, Brain } from "lucide-react";
import SkillCard from "./SkillCard";
import ScrollReveal from "./ScrollReveal";

const SkillsSection = () => {
  const skills = [
    {
      icon: Code2,
      title: "Languages",
      description: "Proficient across systems, backend, and web languages.",
      technologies: ["C++", "Java", "Python", "JavaScript/Node.js", "Rust", "PHP", "HTML/CSS"],
    },
    {
      icon: Layers,
      title: "Frameworks",
      description: "Full stack frameworks for building scalable web and API services.",
      technologies: ["Laravel", "NestJS", "Express.js", "Angular", ".NET/ASP.NET Core"],
    },
    {
      icon: Database,
      title: "Data & Infrastructure",
      description: "Databases, message brokers, and cloud infrastructure for distributed systems.",
      technologies: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Redis",
        "Kafka",
        "RabbitMQ",
        "Docker",
        "AWS (EC2/S3/IAM/VPC)",
        "Azure",
        "Linux",
      ],
    },
    {
      icon: Brain,
      title: "Core Concepts",
      description: "Software design and engineering fundamentals I apply in every project.",
      technologies: ["OOP", "MVC", "Microservices", "REST APIs", "Auth", "OWASP Top 10"],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical <span className="text-primary">Skills</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The stack I use to build reliable backends, distributed systems, and low-level software.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <ScrollReveal key={skill.title} animation="fade-up" delay={index * 100}>
              <SkillCard {...skill} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
