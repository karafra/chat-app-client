import { config } from "dotenv";

config();

interface Auth0CLientClientConfig {
  domain: string;
  client_id: string;
  audience: string
}
interface Environment {
  production: boolean;
  wsUrl: string;
  auth0: Auth0CLientClientConfig,
}

export const environment = {
  production: true,
  wsUrl: process.env.WS_URL || "ws://localhost:8080/chat",
  auth0: {
    domain: process.env.AUTH0_DOMAIN ,
    client_id: process.env.AUTH0_CLIENT_ID,
  }
} as Environment;

