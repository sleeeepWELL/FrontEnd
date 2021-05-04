const API_BASE_URL = "3982623969b121595a2e4fff200e265e";

export const KAKAO_JS_ID = "65403ce93ee115d97b48e55064bce49e";

export const REDIRECT_URI = "http://localhost:3000/kakaoLogin";

export const CLIENT_ID = "5aad60a70a2fd789ef94b24b1126c2fa";

export const ACCESS_TOKEN = "accessToken";

export const OAUTH2_REDIRECT_URI =
  // "http://localhost:8080/kakaoLogin&response_type=code";
  // "http://54.180.79.156/kakaoLogin&response_type=code";
  "http://localhost:3000/kakaoLogin&response_type=code";

export const KAKAO_AUTH_URL =
  // "https://kauth.kakao.com/oauth/authorize?client_id=" +
  // CLIENT_ID +
  // "&redirect_uri=" +
  // OAUTH2_REDIRECT_URI;

  `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
