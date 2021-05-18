export const CLIENT_ID = "3982623969b121595a2e4fff200e265e";

// 리다이렉트 URI
// 로컬 테스트
// export const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";

//서버 배포2
// export const REDIRECT_URI =
//   "http://sleeepwell.s3-website.ap-northeast-2.amazonaws.com/oauth/callback/kakao";

// 최종 도메인
export const REDIRECT_URI = "https://teamsleepwell.com/oauth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
