export const CLIENT_ID = "3982623969b121595a2e4fff200e265e";

//서버 배포용(rederect uri)
// export const REDIRECT_URI =
//   "http://sleeepwell.s3-website.ap-northeast-2.amazonaws.com/oauth/callback/kakao";

//로컬 테스트용(rederect uri)
export const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
