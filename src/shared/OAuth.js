// 클라이언트 설정(테스트)
// export const REDIRECT_URI = "http://localhost:3000/kakaoLogin";
// export const CLIENT_ID = "5aad60a70a2fd789ef94b24b1126c2fa";

// 서버 설정(이현님 앱)
export const CLIENT_ID = "3982623969b121595a2e4fff200e265e";
//서버 배포용
// export const REDIRECT_URI =
//   "http://sleepwell.com.s3-website.ap-northeast-2.amazonaws.com/oauth/callback/kakao";
//로컬 테스트
export const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
// export const REDIRECT_URI = "http://3.35.208.142/oauth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
