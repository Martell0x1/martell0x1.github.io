import { defineTool } from "@lovable.dev/mcp-js";

const PROJECTS = [
  {
    name: "Monitex",
    description:
      "IoT monitoring & anomaly detection platform (ASP.NET Core, Rust/ESP32, RabbitMQ, Angular).",
    tags: ["ASP.NET Core", "Rust", "ESP32", "RabbitMQ", "Angular"],
    url: "https://github.com/Martell0x1/Monitex",
  },
  {
    name: "VisionGate",
    description:
      "Smart garage access control with license-plate recognition (NestJS, Flutter, ESP32, YOLO/OpenCV).",
    tags: ["NestJS", "Flutter", "ESP32", "YOLO", "OpenCV"],
    url: "https://github.com/Martell0x1/VisionGate",
  },
  {
    name: "Rusty-x86_64",
    description: "Bare-metal x86_64 OS kernel written in Rust, tested on QEMU.",
    tags: ["Rust", "x86_64", "QEMU", "OS"],
    url: "https://github.com/Martell0x1/Rusty-x86_64",
  },
  {
    name: "FileShare",
    description: "Cloud file sharing service on AWS (Node.js, S3, EC2, IAM).",
    tags: ["Node.js", "AWS", "S3", "EC2"],
    url: "https://github.com/Martell0x1",
  },
];

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description: "List Marwan's featured projects with descriptions, tech tags, and repository URLs.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PROJECTS, null, 2) }],
    structuredContent: { projects: PROJECTS },
  }),
});
