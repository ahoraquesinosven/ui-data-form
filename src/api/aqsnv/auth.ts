import config from "@/config/config";
import {httpRequest} from "@/utils/http";

const endpointBuilder = (path: string) => () => new URL(path, config.api.aqsnv.server);

const endpoints = {
  pkce: endpointBuilder('/auth/pkce'),
  authorize: endpointBuilder('/auth/authorize'),
  token: endpointBuilder('auth/token'),
  me: endpointBuilder('/auth/me'),
};

export type PKCEPair = {
  verifier: string,
  challenge: string,
  method: string
};

export async function generatePKCEPair(): Promise<PKCEPair> {
  const response = await httpRequest(endpoints.pkce());
  return response.json();
}

export async function buildAuthorizationUrl(state: string, pkcePair: PKCEPair): Promise<URL> {
  const result = endpoints.authorize();
  result.searchParams.append("client_id", config.api.aqsnv.clientId);
  result.searchParams.append("response_type", "code");
  result.searchParams.append("state", state);
  result.searchParams.append("code_challenge", pkcePair.challenge);
  result.searchParams.append("code_challenge_method", pkcePair.method);

  return result;
}

export type AccessToken = string;

export async function exchangeAuthorizationCode(authorizationCode: string, verifier: string): Promise<AccessToken> {
  const requestData = new URLSearchParams();
  requestData.append("code", authorizationCode);
  requestData.append("client_id", config.api.aqsnv.clientId);
  requestData.append("grant_type", "authorization_code");
  requestData.append("code_verifier", verifier);

  const response = await httpRequest(endpoints.token(), {
    body: requestData,
    method: "POST",
  });
  return response.text();
}

export type User = {
  name: string,
  pictureUrl: string,
};

export async function getCurrentUser(token: string): Promise<User> {
  const response = await httpRequest(endpoints.me(), {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });

  return response.json();
}
