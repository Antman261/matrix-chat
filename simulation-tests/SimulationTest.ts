import { defaultConfig, SimulationTestConfig } from "./testConfig.ts";
import {
  ClientApp,
  ServerApp,
  startClientApp,
  startServerInstance,
} from "./utils/process/index.ts";

export class SimulationTest {
  clientInstances: ClientApp[] = [];
  serverInstances: ServerApp[] = [];
  #config: SimulationTestConfig;
  constructor(config = defaultConfig()) {
    this.#config = config;
  }
  async start() {
    this.serverInstances = await Promise.all(
      this.#config.servers.map(startServerInstance)
    );
    const svrPort = this.serverInstances[0]?.app.port;
    this.clientInstances = await Promise.all(
      this.#config.clients.map((cfg) => {
        const config = structuredClone(cfg);
        (config.appArgs ??= []).push(`--serverPort=${svrPort}`);
        return startClientApp(config);
      })
    );
  }
  async cleanup() {
    await Promise.all(
      this.serverInstances
        .map((svr) => svr.app.end())
        .concat(this.clientInstances.map((client) => client.app.end()))
    );
  }
}
