import { beforeAll } from "@std/testing/bdd";
type Opt = {
  something: string;
};

type TestContext = {};

export const setupTest = (_?: Opt): TestContext => {
  let command: Deno.Command;
  beforeAll(async () => {
    command = new Deno.Command("deno", {
      args: ["run", "--allow-net", "main.ts"],
      cwd: "../server",
      stdin: "null",
      stdout: "piped",
    });
    const child = command.spawn();
    const out = child.stdout.getReader();
  });

  return {};
};
