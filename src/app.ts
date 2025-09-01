import express, { Request, Response } from 'express';
import cors from 'cors';
import { randomUUID } from 'node:crypto';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import { registerAll } from './server/index';

const app = express();
const PORT = 3000;

// JSON parsing
app.use(express.json());

// CORS (expose session header for browsers / Postman)
app.use(
  cors({
    origin: '*',
  exposedHeaders: ['Mcp-Session-Id'],
    allowedHeaders: ['Content-Type', 'mcp-session-id']
  })
);

// Store transports by session
const transports: Record<string, StreamableHTTPServerTransport> = {};

// POST /mcp — client->server requests
app.post('/mcp', async (req: Request, res: Response) => {
  console.log("Received MCP request");
  const sessionIdHeader = (req.headers['mcp-session-id'] as string | undefined) ?? undefined;
  let transport: StreamableHTTPServerTransport | undefined = undefined;

  try {
    if (isInitializeRequest(req.body)) {
      console.log("Initializing new MCP session");
      // Create a new session
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (sessionId: string) => {
          console.log("Session initialized:", sessionId);

          // Echo the session id on the initialization response
          try {
            res.setHeader('Mcp-Session-Id', sessionId);
          } catch {}
          console.log(`MCP session initialized: ${sessionId}`);
          transports[sessionId] = transport!;
        },
        // For local dev, consider enabling DNS rebinding protection
        // enableDnsRebindingProtection: true,
        // allowedHosts: ['127.0.0.1']
      });

      // New MCP server per session
      const server = new McpServer({
        name: 'mcp-typescript-server',
        version: '1.0.0'
      });
      registerAll(server);

      // Clean up when transport closes
      transport.onclose = () => {
        if (transport && transport.sessionId) {
          delete transports[transport.sessionId];
        }
        server.close();
      };

      await server.connect(transport);
    } else if (sessionIdHeader && transports[sessionIdHeader]) {
      // Reuse existing transport
      transport = transports[sessionIdHeader];
    } else {
      res.status(400).json({
        jsonrpc: '2.0',
        error: { code: -32000, message: 'Bad Request: No valid session ID provided' },
        id: null
      });
      return;
    }

    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error('POST /mcp error:', err);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: { code: -32603, message: 'Internal server error' },
        id: null
      });
    }
  }
});

// GET /mcp — server->client notifications (SSE)
const handleSession = async (req: Request, res: Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  const transport = sessionId ? transports[sessionId] : undefined;
  if (!transport) {
    res.status(400).send('Invalid or missing session ID');
    return;
  }
  try {
    await transport.handleRequest(req, res);
  } catch (err) {
    console.error(`${req.method} /mcp error:`, err);
    if (!res.headersSent) res.status(500).send('Internal server error');
  }
};

app.get('/mcp', handleSession);
app.delete('/mcp', handleSession);

app.listen(PORT, () => {
  console.log(`MCP Streamable HTTP Server listening on http://localhost:${PORT}`);
});