import {createContext, useContext, useEffect} from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import localforage from "localforage";
import {generatePKCEPair, buildAuthorizationUrl, exchangeAuthorizationCode} from '@/api/aqsnv/auth.ts';
import { AccessToken } from "@/types/auth";

export const AccessTokenContext = createContext(new AccessToken());

export const AccessTokenProvider = AccessTokenContext.Provider

export function useAccessToken() {
  return useContext(AccessTokenContext);
}

export function RequiresAuthorization({ children } : { children: React.ReactNode }) {
  const accessToken = useAccessToken();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      if(!accessToken.isAvailable()) {
        const pkce = await generatePKCEPair();
        await localforage.setItem("pkce", pkce.verifier);
        const authorizationUrl = await buildAuthorizationUrl(location.pathname, pkce);
        window.location.replace(authorizationUrl);
      }
    })();
  });

  if (!accessToken.isAvailable()) {
    return;
  }

  return children;
}

export function AuthorizationCallback() : React.ReactNode {
  const accessToken = useAccessToken();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      const code = searchParams.get("code") || "";
      const state = searchParams.get("state") || "/";

      const pkceVerifier = await localforage.getItem<string>("pkce") || "";
      const response = await exchangeAuthorizationCode(code, pkceVerifier);
      accessToken.accessToken = response.access_token;

      navigate(state);
    })();
  });

  return;
}

