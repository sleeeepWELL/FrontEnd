# sleepwell
[백엔드 깃허브](https://github.com/sleeeepWELL/BackEnd)

## 프로젝트 기획 배경

- 문제 제시

  - 잠을 적게 자야 한다 vs 많이 자야 한다 → 개개인마다 다르다.
  - 개인의 적정수면시간을 어떻게 찾을 수 있을까?

![image](https://user-images.githubusercontent.com/53491653/119460984-3521cf00-bd7a-11eb-8599-e1623cfb4c6a.png)


- 해결책

  - 일상에서 수면에 영향을 주는 요소 및 수면시간을 기록 
  - 개인데이터를 한 눈에 파악하도록하고, 데이터를 활용해 분석 및 수면시간 추천


## 프로젝트 소개

- 인트로페이지에서 서비스 가이드를 볼 수 있다.
- 개개인의 기록 서비스이기 때문에, 회원가입 or 카톡 로그인은 필수적이다.
- 로그인 후 오늘까지의 수면시간을 기록한다
- 캘린더, 분석서비스를 이용하여 시각화 하여 보여준다.
- 데이터가 쌓이면 쌓일 수록 당신에게 맞는 적정수면시간이 나올 것이다.
- 수면시간 외에도, 태그로 표현되어 있는 음주, 야식, 운동, 야근의 주간, 월간 빈도수를 체크할 수 있다.

![image](https://user-images.githubusercontent.com/53491653/119460900-1d4a4b00-bd7a-11eb-9e7b-95928c3cbf11.png)

## React 사용 이유
수면 기록을 입력하고 정보 분석화면 제공을 하게 되는 등 인터렉션이 잦은 프로젝트 특성에 맞추어 사용자에게 유연한 UI 제공을 위해 Virtual DOM이 적용된 React를 사용하게 되었다.   

## 기술 소개
* JWT token(Access + Refresh)
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

## 페이지 구성 및 기능소개
#### :black_small_square: 메인 페이지
![메인페이지](https://user-images.githubusercontent.com/61656046/123097065-b5ffe380-d46a-11eb-8878-00fd6f2be19c.gif)
```
로그인 시 랜더링 되어지는 SleepWell 메인페이지 입니다. 사용자가 기록한 일자별 현황을 달력형태로 한눈에 확인 할 수 있습니다.
```
#### :black_small_square: 분석 페이지
![분석 페이지](https://user-images.githubusercontent.com/61656046/123097516-2eff3b00-d46b-11eb-8696-85288c12ee78.gif)
```
연간 컨디션, 주간태그현황, 월간태그현황, 주간수면시간, 요약 을 순서대로 확인 할 수 있는 페이지 입니다.

사용자에게 적정 수면시간을 안내해줍니다.
```
#### :black_small_square: 인트로 페이지
![인트로페이지](https://user-images.githubusercontent.com/61656046/123097530-3292c200-d46b-11eb-8db2-e143889eae66.gif)
```
서비스 최초 접속시 보여지는 페이지이며 전반적인 서비스 소개내용을 볼 수 있습니다.
```

#### :black_small_square: 가이드 페이지
![가이드페이지](https://user-images.githubusercontent.com/61656046/123097543-358db280-d46b-11eb-9177-26a33ed9146c.gif)
```
사용 방법이 안내되어있는 가이드 페이지 입니다.
```
#### :black_small_square: 로그인(카카오소셜) / 비밀번호 찾기 / 회원가입
![로그인](https://user-images.githubusercontent.com/61656046/123097556-3888a300-d46b-11eb-9ad5-b304c88190cf.gif)
```
이메일 인증을 통한 회원가입, 비밀번호 찾기 기능을 지원합니다.

카카오 소셜로그인 기능을 지원합니다.
```

#### :black_small_square: 글 작성 & 수정/삭제
![작성](https://user-images.githubusercontent.com/61656046/123097582-3de5ed80-d46b-11eb-9415-4becfa79a752.gif)
![수정,삭제](https://user-images.githubusercontent.com/61656046/123097606-42aaa180-d46b-11eb-9a36-f82ce86bf8c3.gif)
```
취침시간, 기상시간, 컨디션(매우나쁨~매우좋음), 태그(음주,야식,야근,운동), 메모를 입력하고 수정 및 삭제 할 수 있습니다.
```
#### :black_small_square: 날짜 검색 및 오늘 날짜 이동
![날짜 검색, 오늘날짜이동](https://user-images.githubusercontent.com/61656046/123097642-49d1af80-d46b-11eb-80ec-168e91716fed.gif)
```
3D 입체 보름달을 선택해 날짜 검색기능을 활성화 시킬수 있으며, 오늘 날짜로 바로 이동가능한 버튼도 지원합니다.
```
#### :black_small_square: 모바일 화면(반응형)
![모바일](https://user-images.githubusercontent.com/61656046/123097659-4e966380-d46b-11eb-841c-5285eed4a689.gif)
```
모바일부터 태블릿 등 다양한 뷰포트의 기종에서도 원활한 서비스 이용이 가능합니다.
```
### 링크
**[서비스 링크](https://teamsleepwell.com/ )**

**[팀원 소개](https://www.notion.so/TeamSleepwell-dcb0a3d7c4fc47d781479c33c3929e48 )**
