import config from "@/config/config";
import {httpRequest} from "@/utils/http";
import {AccessToken} from "@/types/auth";

const endpoints = {
  feedItems: () => new URL("/v1/feed/items", config.api.aqsnv.server),
  feedItemAssignment: (feedItemId: number) => new URL(`/v1/feed/items/${feedItemId}/assignment`, config.api.aqsnv.server),
  feedItemCompletion: (feedItemId: number) => new URL(`/v1/feed/items/${feedItemId}/completion`, config.api.aqsnv.server),
};

export type FeedItem = {
  id: number,
  feed: {
    id: string,
    name: string,
    updatedAt: string,
  },
  publishedAt: string,
  title: string,
  link: string,
  isDone: boolean,
  assignedUser?: {
    name: string,
    email: string,
    pictureUrl: string,
  },
};

export type FeedItemPages = {
  limit: number,
  total: number,
  page: [FeedItem],
};

export type FeedItemState = "backlog" | "inProgress" | "done";

export async function fetchFeedItems(token: AccessToken, state: FeedItemState): Promise<FeedItemPages> {
  const url = new URL(endpoints.feedItems());
  url.searchParams.append("status", state);
  url.searchParams.append("limit", "5");
  const response = await httpRequest(url, {
    headers: {
      "Authorization": token.asAuthorizationHeader(),
    },
  });

  return response.json();
}

export async function assignFeedItem(token: AccessToken, feedItemId: number): Promise<void> {
  await httpRequest(endpoints.feedItemAssignment(feedItemId), {
    method: 'post',
    headers: {
      "Authorization": token.asAuthorizationHeader(),
    },
  });

  return;
}

export async function unassignFeedItem(token: AccessToken, feedItemId: number): Promise<void> {
  await httpRequest(endpoints.feedItemAssignment(feedItemId), {
    method: 'delete',
    headers: {
      "Authorization": token.asAuthorizationHeader(),
    },
  });

  return;
}

export async function completeFeedItem(token: AccessToken, feedItemId: number): Promise<void> {
  await httpRequest(endpoints.feedItemCompletion(feedItemId), {
    method: 'post',
    headers: {
      "Authorization": token.asAuthorizationHeader(),
    },
  });

  return;
}

export async function uncompleteFeedItem(token: AccessToken, feedItemId: number): Promise<void> {
  await httpRequest(endpoints.feedItemCompletion(feedItemId), {
    method: 'delete',
    headers: {
      "Authorization": token.asAuthorizationHeader(),
    },
  });

  return;
}

