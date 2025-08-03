import { TextLineStream } from "jsr:@std/streams@^1.0.9/text-line-stream";
import { Kind } from "./Kind.ts";
import { makeLogger, simLog } from "../log.ts";
import { delay } from "@std/async/delay";
import { releasePort, requestPort } from "./portManager.ts";

export type AppInstance = {
  port: number;
  readonly status: "starting" | "running" | "exited";
  process: Deno.ChildProcess;
  writeText(text: string): Promise<void>;
  end(): Promise<void>;
};

export const initAppInstance = (args: string[], kind: Kind): AppInstance => {
  simLog(`Starting ${kind} with cmd: deno ${args.join(" ")}`);
  try {
    const port = requestPort();
    args.push(`--port=${port}`);
    const process = toPipedDeno(args).spawn();
    const log = makeLogger(kind, process.pid);
    (async () => {
      for await (const logLine of process.stderr
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new TextLineStream()))
        log.error(logLine);
    })();
    (async () => {
      for await (const logLine of process.stdout
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new TextLineStream()))
        log(logLine);
    })();
    process.ref();
    const stream = process.stdin.getWriter();
    const textEncoder = new TextEncoder();
    let status: AppInstance["status"] = "running";
    return {
      process,
      status,
      port,
      writeText: (text: string) => stream.write(textEncoder.encode(text)),
      async end() {
        stream.releaseLock();
        process.kill();

        await delay(10);
        await process.status;
        releasePort(port);
        status = "exited";
      },
    };
  } catch (error) {
    console.error("Error while running the file: ", error);
    Deno.exit(4);
  }
};

const toPipedDeno = (args: string[]) =>
  new Deno.Command(Deno.execPath(), {
    args,
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });
