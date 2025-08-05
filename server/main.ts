import { parseArgs } from "@std/cli";
import { logger } from "hono/logger";
import { showRoutes } from "hono/dev";
import { Hono } from "hono";

const { port } = parseArgs(Deno.args, { string: ["port"] });

const app = new Hono();

app.use(logger());
app.get("/", (c) => c.text("Hello Hono!"));
showRoutes(app, { verbose: true });

Deno.serve({ port: parseInt(port!, 10) }, app.fetch);
