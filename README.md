# sleepwell
[백엔드 깃허브](https://github.com/sleeeepWELL/BackEnd)

## 프로젝트 기획 배경

- 문제 제시

  잠을 적게 자야 한다 vs 많이 자야 한다 → 개개인마다 다르다.
  개인의 적정수면시간을 어떻게 찾을 수 있을까?

![image](https://user-images.githubusercontent.com/53491653/119460984-3521cf00-bd7a-11eb-8599-e1623cfb4c6a.png)


- 해결책

  개인의 일상 안에서 수면에 영향을 주는 요소 및 수면시간을 기록 
  개인데이터를 한 눈에 파악하도록하고 ,데이터를 활용해 분석 및 수면시간 추천


## 프로젝트 소개

- 인트로페이지에서 서비스 가이드를 볼 수 있다.
- 개개인의 기록 서비스이기 때문에, 회원가입 or 카톡 로그인은 필수적이다.
- 로그인 후 오늘까지의 수면시간을 기록한다
- 캘린더, 분석서비스를 이용하여 시각화 하여 보여준다.
- 데이터가 쌓이면 쌓일 수록 당신에게 맞는 적정수면시간이 나올 것이다.
- 수면시간 외에도, 태그로 표현되어 있는 음주, 야식, 운동, 야근의 주간, 월간 빈도수를 체크할 수 있다.

![image](https://user-images.githubusercontent.com/53491653/119460900-1d4a4b00-bd7a-11eb-9e7b-95928c3cbf11.png)


## 기술 소개
* JWT token(Access + Refresh)
  * setTimeout
* 카카오 소셜 로그인
* Spring Data JPA + chart.js, nivo를 활용한 분석
* 데이터 핸들링 + 시각화
* 캘린더 & 카드 구현(CRUD)
* 메일서버 <-> Redis (인증)

![image](https://user-images.githubusercontent.com/53491653/119461912-2687e780-bd7b-11eb-9b53-859291b404f2.png)

## 사용 라이브러리

라이브러리 | 설명
---|:---:
|axios | 서버 통신|
|redux | 전역상태관리| 
|material ui | 외부 ui 사용|
|styled-components | 컴포넌트 스타일링|
|chart/nivo | 차트|
|three | 3D|
|moment | 시간 및 날짜| 


### 링크
**[서비스 링크](https://teamsleepwell.com/ )**

**[팀원 소개](https://www.notion.so/TeamSleepwell-dcb0a3d7c4fc47d781479c33c3929e48 )**
