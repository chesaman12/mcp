export interface ExampleType {
    id: string;
    name: string;
    description?: string;
}

export interface AddInput {
    a: number;
    b: number;
}

export interface GreetingResource {
    uri: string;
    name: string;
}

export interface ToolResponse {
    content: Array<{
        type: string;
        text: string;
    }>;
}

export interface ResourceResponse {
    contents: Array<{
        uri: string;
        text: string;
    }>;
}

export interface PromptInput {
    message: string;
}