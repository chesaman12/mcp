import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { addTool } from "./tools/add";
import { greetingResource } from "./resources/greeting";
import { examplePrompt } from "./prompts/example";

// Context interface for passing request headers and other context
export interface ServerContext {
  headers: Record<string, string | string[] | undefined>;
}

// Registers all tools/resources/prompts on a provided server instance with context
export function registerAll(server: McpServer, context: ServerContext) {
  // Tools - pass context to handlers that need it
  server.registerTool("add", addTool.config, (args) => addTool.handler(args, context));

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