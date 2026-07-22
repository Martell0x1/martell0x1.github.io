import { defineTool } from "@lovable.dev/mcp-js";

const SKILLS = {
  languages: ["C++", "Java", "Python", "JavaScript/Node.js", "Rust", "PHP"],
  frameworks: ["Laravel", "NestJS", "Express", "Angular", ".NET / ASP.NET Core"],
  data: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  infra: ["Kafka", "RabbitMQ", "Docker", "AWS", "Azure", "Linux"],
};

export default defineTool({
  name: "list_skills",
  title: "List skills",
  description: "List Marwan's technical skills grouped by category.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SKILLS, null, 2) }],
    structuredContent: SKILLS,
  }),
});
