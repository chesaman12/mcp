# MCP TypeScript Server

This project implements a server using the Model Context Protocol (MCP) with TypeScript and Node.js. It provides a framework for building applications that can interact with large language models (LLMs) by exposing tools, resources, and prompts.

## Project Structure

```
mcp-typescript-server
├── src
│   ├── app.ts                # Entry point of the application
│   ├── server
│   │   ├── index.ts          # Main server setup
│   │   ├── tools
│   │   │   └── add.ts        # Tool for adding two numbers
│   │   ├── resources
│   │   │   └── greeting.ts   # Resource for generating greeting messages
│   │   └── prompts
│   │       └── example.ts    # Prompt for user interaction
│   └── types
│       └── index.ts          # Type definitions for tools, resources, and prompts
├── docs
│   └── postman
│       └── mcp.postman_collection.json # Postman collection for testing
├── package.json               # npm configuration file
├── tsconfig.json              # TypeScript configuration file
├── .gitignore                 # Git ignore file
└── README.md                  # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mcp-typescript-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run the following command:
```
npm start
```

This will initialize the MCP server and set up the transport layer for communication.

## Testing with Postman

A Postman collection is provided in the `docs/postman` directory. You can import this collection into Postman to test the MCP server endpoints.


## License

This project is licensed under the MIT License. See the LICENSE file for details.