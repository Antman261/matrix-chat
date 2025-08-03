import { blue, brightBlue, cyan } from "@std/fmt/colors";
import { Kind } from "./process/Kind.ts";

const colors = {
  simulation: blue,
  server: cyan,
  client: brightBlue,
} as const satisfies Record<Kind, typeof blue>;

export const makeLogger = (kind: Kind, id?: string | number) => {
  const hasId = id !== undefined;
  const prefix = colors[kind](`${kind}${hasId ? `-${id}` : ""}:`);
  return Object.assign((...args: unknown[]) => console.log(prefix, ...args), {
    error: (...args: unknown[]) => console.error(prefix, ...args),
  });
};

export const simLog = makeLogger("simulation");
