import { z } from "zod";

// Context interface for accessing request headers
interface ToolContext {
  headers: Record<string, string | string[] | undefined>;
}

// Standardized export shape: { config, handler }
export const addTool = {
    config: {
        title: "Addition Tool", 
        description: "Add two numbers together. Supports authentication via Test-Pat header for enhanced functionality.",
        inputSchema: {
            a: z.number().describe("First number to add"),
            b: z.number().describe("Second number to add")
        }
    },
    handler: async ({ a, b }: { a: number; b: number }, context: ToolContext) => {
        try {
            console.log('Tool context headers:', context.headers);
            
            // Access the Test-Pat header for use in API requests
            const testPat = context.headers['test-pat'] || context.headers['Test-Pat'];
            console.log('Test-Pat header:', testPat ? '***' : 'not provided');
            
            // Here you would use the testPat header for your API request
            // Example: const response = await fetch('https://api.example.com/data', {
            //   headers: { 'Authorization': `Bearer ${testPat}` }
            // });
            
            const result = a + b;
            
            return {
                content: [
                    {
                        type: "text" as const,
                        text: testPat 
                            ? `Result: ${result} (authenticated request processed)`
                            : `Result: ${result}`
                    }
                ]
            };
        } catch (error) {
            console.error('Error in addTool:', error);
            return {
                content: [
                    {
                        type: "text" as const,
                        text: `Error performing addition: ${error instanceof Error ? error.message : 'Unknown error'}`
                    }
                ]
            };
        }
    }
};