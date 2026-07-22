import { defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get-profile";
import listProjects from "./tools/list-projects";
import listSkills from "./tools/list-skills";
import listExperience from "./tools/list-experience";
import getPageViews from "./tools/get-page-views";

export default defineMcp({
  name: "martell0x1-portfolio-mcp",
  title: "Marwan Zein Portfolio MCP",
  version: "0.1.0",
  instructions:
    "Read-only tools exposing Marwan Mohamed Zein's (Martell0x1) portfolio: profile, projects, skills, experience, and page view count. Use `get_profile` first for an overview.",
  tools: [getProfile, listProjects, listSkills, listExperience, getPageViews],
});
