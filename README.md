# MCP TypeScript Server

This project implements a **Model Context Protocol (MCP) server** using TypeScript and Node.js with **Streamable HTTP transport**. It demonstrates best practices for building MCP servers that can interact with AI applications through tools, resources, and prompts.

## 🚀 Features

- **✅ Streamable HTTP Transport**: Modern HTTP-based MCP transport with session management
- **✅ Server-Level Context Injection**: Secure header-based authentication support  
- **✅ Full MCP Coverage**: Tools, Resources, and Prompts implementations
- **✅ TypeScript**: Full type safety and modern JavaScript features
- **✅ Testing**: Complete Postman collection for API testing
- **✅ Production Ready**: Error handling, logging, and CORS support

## 🏗️ Architecture

This server follows **Option 1: Server-Level Context Injection** from the [MCP documentation](https://modelcontextprotocol.io/), enabling secure access to request headers (like authentication tokens) within tool handlers.

## Project Structure

```
mcp-typescript-server/
├── src/
│   ├── app.ts                # Express server & MCP transport setup
│   ├── server/
│   │   ├── index.ts          # Server registration with context injection
│   │   ├── tools/
│   │   │   └── add.ts        # Addition tool with auth header support
│   │   ├── resources/
│   │   │   └── greeting.ts   # Greeting resource with URI templates
│   │   └── prompts/
│   │       └── example.ts    # Interactive prompt with completable args
│   └── types/
│       └── index.ts          # TypeScript definitions
├── docs/postman/
│   └── mcp.postman_collection.json # Complete testing suite
├── package.json               # npm config with MCP metadata
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
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