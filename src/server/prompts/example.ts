import { z } from "zod";
import { completable } from "@modelcontextprotocol/sdk/server/completable.js";

export const examplePrompt = {
    config: {
        title: "Example Prompt",
        description: "An example prompt that interacts with the user.",
        argsSchema: {
            userInput: z.string().describe("Input provided by the user"),
            category: completable(z.string(), (value) => {
                return ["greeting", "farewell", "question"].filter(c => c.startsWith(value));
            })
        }
    },
    builder: ({ userInput, category }: { userInput: string; category: string }) => {
        let responseText = "";

        switch (category) {
            case "greeting":
                responseText = `Hello! You said: ${userInput}`;
                break;
            case "farewell":
                responseText = `Goodbye! You said: ${userInput}`;
                break;
            case "question":
                responseText = `You asked: ${userInput}`;
                break;
            default:
                responseText = "Unknown category.";
        }

        return {
            messages: [
                {
                    role: "assistant" as const,
                    content: {
                        type: "text" as const,
                        text: responseText
                    }
                }
            ]
        };
    }
};