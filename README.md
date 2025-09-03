# MCP Header Context Demo

A **demonstration MCP server** that showcases how to securely pass custom headers (like authentication tokens) from HTTP requests into MCP tool handlers using **Server-Level Context Injection**.

## 🎯 Purpose

This test application demonstrates the **recommended approach** from the [MCP documentation](https://modelcontextprotocol.io/) for accessing request headers within MCP tools. Perfect for learning how to:

- � **Pass authentication tokens** to tools that need to make API calls
- 📡 **Access custom headers** like `Test-Pat`, `Authorization`, etc.
- 🏗️ **Implement Server-Level Context Injection**
- 🧪 **Test header-based authentication** in MCP workflows

## 🚀 Quick Demo

1. **Start the server**: `npm start`
2. **Initialize session**: Send MCP `initialize` request
3. **Call tool with header**: Include `Test-Pat: your-token` header
4. **See the result**: Tool receives and uses the header value

The `add` tool will show different output based on whether the `Test-Pat` header is present, demonstrating how tools can access authentication tokens for downstream API calls.

## 🏗️ How It Works

This demo implements **Server-Level Context Injection** where:

1. **Express receives** HTTP request with custom headers
2. **Context is created** containing all request headers  
3. **MCP server registers** tools with access to this context
4. **Tool handlers** can access headers like `Test-Pat` for authentication

```typescript
// Context passed to all tools
const context: ServerContext = {
  headers: req.headers  // Contains Test-Pat, Authorization, etc.
};

// Tool can access headers
const testPat = context.headers['test-pat'] || context.headers['Test-Pat'];
```

## 📁 Project Structure

```
mcp-header-demo/
├── src/
│   ├── app.ts                # Express server with header context injection
│   ├── server/
│   │   ├── index.ts          # Context-aware tool registration
│   │   └── tools/
│   │       └── add.ts        # Demo tool that uses Test-Pat header
│   └── types/index.ts        # TypeScript definitions
├── docs/postman/
│   └── mcp.postman_collection.json # Test requests with/without headers
└── package.json              # npm configuration
```

## 🧪 Testing the Header Demo

### Option 1: Using Postman (Recommended)

1. Import `docs/postman/mcp.postman_collection.json`
2. Run **"Initialize"** to create MCP session
3. Test **"Call Tool: add"** (without header)
4. Test **"Call Tool: add (with Test-Pat header)"** (with authentication)

### Option 2: Using curl

```bash
# Initialize session and capture session ID
curl -i -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"clientInfo":{"name":"test","version":"1.0"},"capabilities":{}}}' \
  http://localhost:3000/mcp

# Call tool WITHOUT Test-Pat header
curl -X POST -H "Content-Type: application/json" \
  -H "mcp-session-id: YOUR_SESSION_ID" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"add","arguments":{"a":5,"b":3}}}' \
  http://localhost:3000/mcp

# Call tool WITH Test-Pat header (shows authentication)
curl -X POST -H "Content-Type: application/json" \
  -H "mcp-session-id: YOUR_SESSION_ID" \
  -H "Test-Pat: my-auth-token-123" \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add","arguments":{"a":5,"b":3}}}' \
  http://localhost:3000/mcp
```

## 🔍 Expected Results

- **Without header**: `"Result: 8"`
- **With Test-Pat header**: `"Result: 8 (authenticated request processed)"`

This demonstrates how the tool can detect and use authentication headers for API calls.

## 💡 Real-World Use Cases

This pattern is perfect for tools that need to:

- 🔑 **Make authenticated API calls** (GitHub, Slack, etc.)
- 🏢 **Access enterprise systems** with bearer tokens  
- 🌐 **Call third-party services** with API keys
- 🔐 **Maintain security context** across tool executions

## 🚀 Installation & Usage

1. **Clone this demo**:
   ```bash
   git clone <repository-url>
   cd mcp-header-demo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the demo server**:
   ```bash
   npm start
   ```

4. **Test with headers** using Postman or curl (see testing section above)

## 🔧 Key Implementation Details

### Context Injection (src/server/index.ts)
```typescript
// Pass request headers as context to all tools
const context: ServerContext = { headers: req.headers };
registerAll(server, context);
```

### Header Access in Tools (src/server/tools/add.ts)
```typescript
// Tool can access any request header
const testPat = context.headers['test-pat'] || context.headers['Test-Pat'];

// Use for API authentication
if (testPat) {
  // Make authenticated API call
  // const response = await fetch('https://api.example.com/data', {
  //   headers: { 'Authorization': `Bearer ${testPat}` }
  // });
}
```

## 📚 Learn More

- **[MCP Documentation](https://modelcontextprotocol.io/)** - Official protocol docs
- **[Server-Level Context Injection](https://modelcontextprotocol.io/)** - The pattern this demo implements
- **[MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)** - Official SDK

## 📝 Notes

This is a **demonstration application** designed for learning and testing. For production use, consider:
- Input validation and sanitization
- Proper error handling and logging  
- Security headers and CORS policies
- Rate limiting and authentication middleware

## Testing with Postman

A Postman collection is provided in the `docs/postman` directory. You can import this collection into Postman to test the MCP server endpoints.


## License

This project is licensed under the MIT License. See the LICENSE file for details.