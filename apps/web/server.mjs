import { createServer } from 'http';
import { parse } from 'url';

const port = parseInt(process.env.PORT || '5000', 10);
const hostname = '0.0.0.0';

let nextReady = false;
let bootFailed = false;
let handle = null;

const STARTUP_HTML = `<!DOCTYPE html><html><head><title>TrueCompute</title></head><body style="background:#06080c;color:#ddd8d0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;font-family:sans-serif"><p>Loading...</p></body></html>`;

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);

  if (parsedUrl.pathname === '/api/health') {
    if (bootFailed) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('boot failed');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('ok');
    }
    return;
  }

  if (bootFailed) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Application failed to start');
    return;
  }

  if (!nextReady) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(STARTUP_HTML);
    return;
  }

  handle(req, res, parsedUrl);
});

server.listen(port, hostname, () => {
  console.log(`> Server listening on http://${hostname}:${port}`);

  import('next').then((mod) => {
    const next = mod.default;
    const app = next({ dev: false, hostname, port });
    handle = app.getRequestHandler();

    app.prepare().then(() => {
      nextReady = true;
      console.log('> Next.js ready');
    }).catch((err) => {
      bootFailed = true;
      console.error('> Next.js failed to start:', err);
    });
  }).catch((err) => {
    bootFailed = true;
    console.error('> Failed to load Next.js:', err);
  });
});
