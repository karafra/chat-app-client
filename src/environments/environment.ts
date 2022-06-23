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
  wsUrl: "ws://localhost:8080/chat",
  auth0: {
    domain: "dev-rz2wno4j.us.auth0.com",
    client_id: "WqhUGhUKnD8E0ZfkcIj0wA95uM9Y1bLh", 
  }
} as Environment;
