import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(__dirname, "..");
const port = Number.parseInt(process.env.PORT ?? "5173", 10);
const host = process.env.HOST ?? "127.0.0.1";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host ?? host}`);
  const pathname = decodeURIComponent(requestUrl.pathname);
  const filePath = resolveFilePath(pathname);

  if (!filePath) {
    send(response, 403, "Forbidden");
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      send(response, 404, "Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath)] ?? "application/octet-stream",
      "Cache-Control": "no-store"
    });

    createReadStream(filePath).pipe(response);
  } catch (error) {
    send(response, 404, "Not found");
  }
});

server.listen(port, host, () => {
  const url = `http://${host}:${port}/preview.html`;
  console.log(`Preview server running at ${url}`);
  console.log("Press Ctrl+C to stop.");
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Try PORT=5174 npm run preview.`);
    process.exit(1);
  }

  throw error;
});

function resolveFilePath(pathname) {
  const targetPath = pathname === "/" ? "/preview.html" : pathname;
  const normalizedPath = normalize(targetPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(rootDir, normalizedPath);
  const relativePath = relative(rootDir, filePath);

  if (relativePath.startsWith("..") || relativePath === "") {
    return null;
  }

  return filePath;
}

function send(response, statusCode, message) {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(message);
}
