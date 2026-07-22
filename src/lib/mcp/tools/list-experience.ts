import { defineTool } from "@lovable.dev/mcp-js";

const EXPERIENCE = [
  {
    role: "Backend Engineering Intern",
    company: "Dice Marketing (Spread Social)",
    from: "May 2026",
    to: "Present",
    highlights: [
      "Built REST APIs and event-driven workflows for the Spread Social platform.",
    ],
  },
  {
    role: "Coding Instructor",
    company: "ElCode - FCDS, Alexandria University",
    highlights: ["Taught programming fundamentals and problem solving."],
  },
];

export default defineTool({
  name: "list_experience",
  title: "List experience",
  description: "List Marwan's work experience and teaching roles.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(EXPERIENCE, null, 2) }],
    structuredContent: { experience: EXPERIENCE },
  }),
});
