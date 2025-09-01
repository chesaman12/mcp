import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { addTool } from "./tools/add";
import { greetingResource } from "./resources/greeting";
import { examplePrompt } from "./prompts/example";

// Registers all tools/resources/prompts on a provided server instance
export function registerAll(server: McpServer) {
  // Tools
  server.registerTool("add", addTool.config, addTool.handler);

  // Resources
  server.registerResource(
    "greeting",
    greetingResource.template,
    greetingResource.metadata,
    greetingResource.resolver
  );

  // Prompts
  server.registerPrompt(
    "example",
    examplePrompt.config,
    examplePrompt.builder
  );
}