import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import fs from 'fs';
import path from 'path';

const apiMiddleware = () => {
  return {
    name: 'api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith('/api/')) {
          try {
            const buffers = [];
            for await (const chunk of req) {
              buffers.push(chunk);
            }
            const data = Buffer.concat(buffers).toString();
            if (data) {
              try {
                req.body = JSON.parse(data);
              } catch (e) {
                req.body = data;
              }
            }
            
            // Map /api/crm -> /api/crm.js
            let urlPath = req.url.split('?')[0];
            let handlerPath = path.join(process.cwd(), urlPath + '.js');
            
            if (fs.existsSync(handlerPath)) {
              // Add helper methods to res to simulate Vercel / Express
              res.status = (code) => {
                res.statusCode = code;
                return res;
              };
              res.json = (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              };

              // Import the handler dynamically, bypassing cache in dev
              const moduleUrl = "file://" + handlerPath + "?update=" + Date.now();
              const { default: handler } = await import(moduleUrl);
              await handler(req, res);
            } else {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: "API route not found" }));
            }
          } catch (e) {
            console.error('API Error:', e);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal server error' }));
          }
        } else {
          next();
        }
      });
    }
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), apiMiddleware()],
  server: {
    port: 8080,
    strictPort: true,
  },
});
