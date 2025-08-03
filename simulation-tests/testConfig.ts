import {
  ClientAppConfig,
  defaultClientConfig,
} from "./utils/process/startClientInstance.ts";
import {
  ServerConfig,
  defaultServerConfig,
} from "./utils/process/startServerInstance.ts";

export type SimulationTestConfig = {
  servers: ServerConfig[];
  clients: ClientAppConfig[];
  keepTestServerOpen?: boolean;
};
export const defaultConfig = (): SimulationTestConfig => ({
  servers: [defaultServerConfig()],
  clients: [defaultClientConfig()],
  keepTestServerOpen: false,
});
