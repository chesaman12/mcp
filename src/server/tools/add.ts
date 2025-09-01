import { z } from "zod";

// Standardized export shape: { config, handler }
export const addTool = {
    config: {
        title: "Addition Tool",
        description: "Add two numbers",
        inputSchema: {
            a: z.number(),
            b: z.number()
        }
    },
    handler: async ({ a, b }: { a: number; b: number }) => {
        return {
            content: [
                {
                    type: "text" as const,
                    text: String(a + b)
                }
            ]
        };
    }
};