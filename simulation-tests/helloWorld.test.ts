import { expect } from "@std/expect";
import { makeSimTest } from "./utils/harness/makeTestFrame.ts";
import { tryUntil } from "./utils/until.ts";

const withSim = makeSimTest({
  clients: [{ name: "cli-chat" }],
  servers: [{}],
});
Deno.test(
  "Simulator runs the server",
  withSim(async ({ simCtx }) => {
    const { text } = await simCtx.serverInstances[0].getText("/");
    expect(text).toEqual("Hello Hono!");
  })
);

Deno.test(
  "Client is interactive",
  withSim(async ({ simCtx }) => {
    const client = simCtx.clientInstances[0];
    await client.app.writeLine("/exit\n");
    expect(
      await tryUntil(() => client.app.logs.at(-1) === "Exiting chat app")
    ).toEqual(true);
  })
);
