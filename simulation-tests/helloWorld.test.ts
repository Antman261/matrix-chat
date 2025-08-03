import { expect } from "@std/expect";
import { makeSimTest } from "./utils/harness/makeTestFrame.ts";

const withSim = makeSimTest({
  clients: [],
  servers: [{}],
});
Deno.test(
  "Simulator runs the server",
  withSim(async ({ simCtx }) => {
    const { text } = await simCtx.serverInstances[0].getText("/");
    expect(text).toEqual("Hello Hono!");
  })
);
