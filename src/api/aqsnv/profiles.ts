import config from "@/config/config";
import {httpRequest} from "@/utils/http";
import {AccessToken} from "@/types/auth";

const endpoints = {
  me: () => new URL('/v1/profiles/me', config.api.aqsnv.server),
};

export type User = {
  name: string,
  pictureUrl: string,
};

export async function fetchCurrentUser(token: AccessToken): Promise<User> {
  const response = await httpRequest(endpoints.me(), {
    headers: {
      "Authorization": token.asAuthorizationHeader(),
    },
  });

  return response.json();
}


