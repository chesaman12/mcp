import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

// Export in the pattern expected by server.registerResource
export const greetingResource = {
    template: new ResourceTemplate("greeting://{name}", { list: undefined }),
    metadata: {
        title: "Greeting Resource",
        description: "Generates a greeting message based on the provided name"
    },
    resolver: async (uri: URL, variables: Record<string, unknown>) => {
        const name = String(variables.name ?? "World");
        return {
            contents: [
                {
                    uri: uri.href,
                    text: `Hello, ${name}!`
                }
            ]
        };
    }
};