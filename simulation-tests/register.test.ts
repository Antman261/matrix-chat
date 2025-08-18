import { expect } from "@std/expect";
import { delay } from "@std/async/delay";
import { makeSimTest } from "./utils/harness/makeTestFrame.ts";
import { tryUntil } from "./utils/until.ts";

const withSim = makeSimTest({
  clients: [{ name: "cli-chat" }],
  servers: [{}],
});

Deno.test(
  "Client can register with chat server",
  withSim(async ({ simCtx }) => {
    const client = simCtx.clientInstances[0];
    const waited = await tryUntil(
      () => client.app.logs.at(-1) === "CLI chat client started!"
    );
    console.log({ waited });
    await client.app.writeLine("/register some-parameters");
    await delay(10);
    expect(client.app.logs.at(-1)).toEqual("Registering... some-parameters");
  })
);
