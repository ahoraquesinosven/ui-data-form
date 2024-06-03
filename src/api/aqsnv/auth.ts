import config from "@/config/config";
import {httpRequest} from "@/utils/http";
import {AccessToken} from "@/types/auth";

const endpoints = {
  pkce: () => new URL('/auth/pkce', config.api.aqsnv.server),
  authorize: () => new URL('/auth/authorize', config.api.aqsnv.server),
  token: () => new URL('auth/token', config.api.aqsnv.server),
  me: () => new URL('/v1/profiles/me', config.api.aqsnv.server),
  feedItems: () => new URL("/v1/feed/items", config.api.aqsnv.server),
  feedItemAssignment: (feedItemId: string) => new URL(`/v1/feed/items/${feedItemId}/assignment`, config.api.aqsnv.server),
  feedItemCompletion: (feedItemId: string) => new URL(`/v1/feed/items/${feedItemId}/completion`, config.api.aqsnv.server),
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

export type AccessTokenResponse = {
  access_token: string,
  token_type: string,
  expires_in: number,
};

export async function exchangeAuthorizationCode(authorizationCode: string, verifier: string): Promise<AccessTokenResponse> {
  const requestData = new URLSearchParams();
  requestData.append("code", authorizationCode);
  requestData.append("client_id", config.api.aqsnv.clientId);
  requestData.append("grant_type", "authorization_code");
  requestData.append("code_verifier", verifier);

  const response = await httpRequest(endpoints.token(), {
    body: requestData,
    method: "POST",
  });
  return response.json();
}

export type User = {
  name: string,
  pictureUrl: string,
};

export async function getCurrentUser(token: AccessToken): Promise<User> {
  const response = await httpRequest(endpoints.me(), {
    headers: {
      "Authorization": token.asAuthorizationHeader(),
    },
  });

  return response.json();
}

export type FeedItem = object;

export type Feed = {
  backlog: [FeedItem],
  inProgress: [FeedItem],
  done: [FeedItem],
};

export async function getFeedItems(token: AccessToken, status: "backlog" | "inProgress" | "done") {
  const url = new URL(endpoints.feedItems());
  url.searchParams.append("status", status);
  const response = await httpRequest(url, {
    headers: {
      "Authorization": token.asAuthorizationHeader(),
    },
  });

  return response.json();
}


export async function getFeed(token: AccessToken): Promise<Feed> {
  const [backlog, inProgress, done] = await Promise.all([
    getFeedItems(token, "backlog"),
    getFeedItems(token, "inProgress"),
    getFeedItems(token, "done"),
  ]);

  return {backlog, inProgress, done};
}

export async function assignFeedItem(token: AccessToken, feedItemId: string): Promise<void> {
  await httpRequest(endpoints.feedItemAssignment(feedItemId), {
    method: 'post',
    headers: {
      "Authorization": token.asAuthorizationHeader(),
    },
  });

  return;
}

export async function unassignFeedItem(token: AccessToken, feedItemId: string): Promise<void> {
  await httpRequest(endpoints.feedItemAssignment(feedItemId), {
    method: 'delete',
    headers: {
      "Authorization": token.asAuthorizationHeader(),
    },
  });

  return;
}

export async function completeFeedItem(token: AccessToken, feedItemId: string): Promise<void> {
  await httpRequest(endpoints.feedItemCompletion(feedItemId), {
    method: 'post',
    headers: {
      "Authorization": token.asAuthorizationHeader(),
    },
  });

  return;
}

export async function uncompleteFeedItem(token: AccessToken, feedItemId: string): Promise<void> {
  await httpRequest(endpoints.feedItemCompletion(feedItemId), {
    method: 'delete',
    headers: {
      "Authorization": token.asAuthorizationHeader(),
    },
  });

  return;
}
