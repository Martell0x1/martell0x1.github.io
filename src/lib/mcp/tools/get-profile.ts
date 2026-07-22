import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description: "Get Marwan Mohamed Zein's professional profile summary, focus areas, and location.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            name: "Marwan Mohamed Zein",
            handle: "Martell0x1",
            title: "Full Stack Developer",
            focus: ["Backend", "Embedded", "IoT", "Linux / Systems Programming"],
            stack: ["Angular", ".NET", "Node.js", "NestJS", "Rust"],
            location: "Alexandria, Egypt",
            education: "B.Sc. Computer Science, Alexandria University (expected May 2027)",
            currentRole: "Backend Engineering Intern @ Dice Marketing (Spread Social)",
            website: "https://martell0x1.lovable.app",
            github: "https://github.com/Martell0x1",
            youtube: "https://www.youtube.com/@marawanmohamed7126",
            email: "marawanzein222@gmail.com",
          },
          null,
          2,
        ),
      },
    ],
  }),
});
