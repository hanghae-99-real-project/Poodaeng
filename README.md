# front-end
# 프로젝트 이름

푸댕

푸댕은 서울시의 반려견 배변 시설 위치와 길 안내, 반려견의 실종 위치와 사용자들의 제보를 제공하는 서비스입니다. 

## 시작하기

이 섹션에서는 프로젝트를 시작하는 방법에 대해 설명합니다.

### 구성 요소

* React.js
* Redux toolkit
* Tailwind CSS
* React Router Dom
* zustand
* axios
* Kakaomap API
* Tmap API

## 사용 방법

프로젝트 사용 방법에 대해 간단하게 설명하세요. 가능하다면 사용 예제도공해 주세요.

## 기여

서대식
- 메인화면 알림
- 이벤트
- 공통 Header, Footer
- Kakao API
  - 위도,경도를 사용하여 푸박스 등록
   - 서버에 등록된 DB를 조회하여 kakao map 에 marker 표시
  - 푸박스 상세 보기
  - 푸박스 신고
- Tmap API
  - 푸박스 길찾기
- 프로필 수정

조형민
- 로그인
- 회원가입(번호, 소셜)
- 실종 반려견 게시글 CRUD
- 게시글 댓글&대댓글 CRUD
- 게시글 header footer
- 게시글 검색 기능
- 게시글&마이페이지 북마크
- 게시글 지도 실종위치 & 마커(Kakao API)
- 마이페이지 내가 작성한 글

### 트러블 슈팅
1. 푸박스 등록 (이미지 , 위치 좌표 , 내용) 을 하는데 500, 419, 400, 에러가 뜸. 
- 원인
    - 서버에 전송하는 post 형식과 서버에서 받는 형식이 달라서 정상적으로 전송되지않음
- 해결
    - formdata는 기본적으로 form tag 안에 넣은부분만 들어가는걸 확인
    - Blob을 사용하니, 서버에서 원하는 형식이 아닌걸 서버측 테스트 로그를 보고 확인 후 form data로 모든 데이터를 전달
    - 서버쪽에서 refreshtoken을 받는 코드에서 오류가 있었음을 확인 후 수정했더니, 정상 작동함
2.  디자인된 아이콘이 깨지는 현상
- 원인
    - 하단 Foorter에서 <img src=’image.png’ /> 의 형태로 했을 때, 이미지가 커질수록 깨지는 현상이 발생함
- 해결
    - 각 이미지들을 svg 로 받아 각각 적용
    
    ```jsx
    import { ReactComponent as PooBox } from '../assets/images/Poobox.svg';
    import { ReactComponent as HomeIcon } from '../assets/images/home.svg';
    import { ReactComponent as MapIcon } from '../assets/images/Map.svg';
    import { ReactComponent as DaengIcon } from '../assets/images/daengfinder.svg';
    import { ReactComponent as ProfileIcon } from '../assets/images/myprofile.svg';
    ```
    
    - 추가적으로 hover 이벤트를 적용하여 마우스 오버 시 테두리 색상을 변경하도록 추가함
3.
