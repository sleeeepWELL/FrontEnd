const API_BASE_URL = "3982623969b121595a2e4fff200e265e";

export const ACCESS_TOKEN = "accessToken";

export const OAUTH2_REDIRECT_URI =
  //   "http://localhost:8080/kakaoLogin&response_type=code";
  "http://54.180.79.156/kakaoLogin&response_type=code";

export const KAKAO_AUTH_URL =
  "https://kauth.kakao.com/oauth/authorize?client_id=" +
  API_BASE_URL +
  "&redirect_uri=" +
  OAUTH2_REDIRECT_URI;
