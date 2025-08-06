// Microsoft OAuth settings
export const oauthConfig = {
  clientId: process.env.AZURE_CLIENT_ID!,
  clientSecret: process.env.AZURE_CLIENT_SECRET!,
  redirectUri: `${process.env.NEXT_PUBLIC_FRONTEND_URL!}/api/auth/callback`,
  tenant: process.env.AZURE_TENANT_ID!,
  authorizeUrl: `https://login.microsoftonline.com/${process.env
    .AZURE_TENANT_ID!}/oauth2/v2.0/authorize`,
  tokenUrl: `https://login.microsoftonline.com/${process.env
    .AZURE_TENANT_ID!}/oauth2/v2.0/token`,
  scope: "openid profile email offline_access",
};

export function getAuthorizationUrl(state: string) {
  const params = new URLSearchParams({
    client_id: oauthConfig.clientId,
    response_type: "code",
    redirect_uri: oauthConfig.redirectUri,
    response_mode: "query",
    scope: oauthConfig.scope,
    state,
  });
  return `${oauthConfig.authorizeUrl}?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string) {
  const res = await fetch(oauthConfig.tokenUrl, {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: new URLSearchParams({
      client_id: oauthConfig.clientId,
      scope: oauthConfig.scope,
      code,
      redirect_uri: oauthConfig.redirectUri,
      grant_type: "authorization_code",
      client_secret: oauthConfig.clientSecret,
    }),
  });

  if (!res.ok) throw new Error("Token exchange failed");
  return res.json(); // { access_token, refresh_token, expires_in, ... }
}
