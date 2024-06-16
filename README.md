# **뉴스 스탠드 - Vanilla JS**

<br>

# 🙋‍♂️ **멤버**

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/planetBing">
        <img src="https://avatars.githubusercontent.com/u/150240792?v=4" width="150px;" alt="정채영 프로필 사진"/><br />
        <sub><b>정채영</b><br></sub>
      </a>
    </td>
  </tr>
</table>

<br>

# 📚 **개발 포인트**

<details>
<summary>옵저버 패턴</summary>
<div markdown="1">

- 웹 페이지 하단 부는 네 가지 이상의 다양한 형태의 UI를 가지고 있습니다.
- 각 형태는 '구독 상태', '구독 실행 및 구독 취소', '뷰 타입' 등 다양한 데이터와 사용자 동작에 따라 전환됩니다.
  - 예를 들어, 'list view'의 '전체언론사' ui에서 사용자가 어떠한 언론사를 구독하는 순간 'list view'의 '구독한 언론사' ui를 바로 렌더링해야 합니다.
- 다양한 사용자의 동작과 데이터 상태를 조합해, UI를 결정하고 그리는 로직이 점점 복잡해졌습니다.
- 이러한 이유로 상태를 관리하는 로직과 UI를 그리는 로직을 분리하고 싶어졌습니다.
- 데이터 상태를 관리하는 store를 따로 두고, store의 값이 바뀔 때 해당 조건에 맞는 ui가 자동으로 렌더링되도록 하면, 각 컴포넌트에서 알고 다뤄야하는 로직이 줄어든다고 생각하였습니다.
- 이를 간단한 옵저버 패턴으로 구현하여 해결했습니다.
  - store에 viewType과 subsType 상태를 두고, 타입 상태가 변경될 때마다 변경을 감지하고 실행되어야 할 view 함수들을 구독시킵니다.
  - 실제로 store가 변경되면 그에 따라 자동으로 view함수가 실행되어 조건에 맞는 ui가 자동으로 렌더링 됩니다.

</div>
</details>

<details>
<summary>이벤트 위임</summary>
<div markdown="1">

- 각 구독하기/해지하기 버튼이 자신이 클릭되었을 때 처리할 로직을 알고 있기 때문에 버튼 컴포넌트에 이벤스리스너를 등록하려 했습니다.
- 그러나, 해당 앱에서 언론사는 수십개 이상이기 때문에 이벤트리스너를 버튼에서 관리, 등록하면 등록되는 이벤트리스너가 너무 많아지는 문제가 발생했습니다.
- 또한 동일한 이벤트에 대해서 중복된 리스너가 계속해서 등록되는 경우도 발생했습니다. (이벤트가 발생하였다고 하여도 한 번 등록된 이벤트 리스너는 따로 remove해주지 않는 이상 사라지지 않아서...)
- 이렇게 이벤트 리스너가 불필요하게 계속 추가되면 메모리도 많이 차지하게 되고, 예기치 않게
  이벤트가 중복 발생할 수 있게 됩니다.
- 따라서, 언론사를 감싸고 있는 Wrapper에 이벤트를 하나만 등록해주고 event target의 내용(구독하기인지 해지하기인지)으로 버튼의 종류를 판단해 이벤트를 처리해주었습니다.

</div>
</details>

<details>
<summary>클린 코드</summary>
<div markdown="1">

- 렌더링 함수
  - 템플릿 리터럴과 innerHTML로 html 요소들을 렌더링했는데, 템플릿 리터럴의 길이가 길어 가독성이 떨어지는 문제가 발생했습니다.
  - 템플릿 리터럴을 구성하는데 필요한 데이터를 인자로 받아 완성된 템플릿리터럴을 반환하는 함수로 로직을 추상화하였습니다.
- 데이터 fetching
  - 데이터를 fetch하는 경우 요청 본문, 에러 처리 등으로 인해 코드의 부피가 커지고, 반복 사용되는 부분이 많았기 때문에 api파일로 따로 분리해 관리했습니다.
- 코드 재사용
  - 공통되고 자주 등장하는 css 스타일들은 클래스로 따로 분리해서 재사용을 용이하게 하였습니다. (예를 들어 flex-space, pointer 등)
  - 스낵바의 경우 여러 군데에서 재활용 될 수 있고, 상황에 따라 스낵바의 내용만 달라지는 형태로 활용되어서 showSnackBar라는 함수로 추상화하여 사용했습니다.

</div>
</details>

<br/>

# 🖥 **시작하기**

### **1. 세팅**

```bash
git clone https://github.com/planetBing/fe-newsstand.git

cd newsStand
npm install

cd json-server-exam
npm install
```

### **2. 실행**

```bash
# /newsStand/json-server-exam
npm start

# /newsStand
npm start
```

<br>

# 😎 **결과**

<details>
   <summary style='font-size: 1.25rem; font-weight: 700'>스크린샷</summary>
   <div markdown="1">

### <strong>메인 화면</strong>

<br>

### <strong>구독/해지 기능</strong>

1. 그리드 뷰
2. 리스트 뷰

   <div>
</details>

<br>

### <strong>롤링 뉴스 기능</strong>

# 🖥 **진행 체크리스트**

<details>
<summary>Week_1</summary>
<div markdown="1">

### ✅ 목요일 체크리스트

- [x] 크롤링한 json 데이터 읽어오기
- [x] 자바스크립트로 페이지 만들기
- [x] 자바스크립트와 css를 이용해 언론사 그리드 버튼 사라지게 하기

### ✅ 금요일 체크리스트

- [x] viewer 부분 i태그로 교체 및 스타일링
- [x] 언론사 그리드 구독하기 버튼 만들기
- [x] 뉴스스탠드 로고 클릭 시 새로고침 구현
- [x] 함수 리팩토링

</div>
</details>

<details>
<summary>Week_2</summary>
<div markdown="1">

### ✅ 월요일 체크리스트

- [x] DOM APIs 학습하기
- [x] 뉴스 데이터 크롤링
- [x] 저번주 미션 함수 리팩토링

### ✅ 화요일 체크리스트

- [x] 최신 뉴스 자동 롤링 영역 완성
- [x] 뉴스 리스트 크롤링

### ✅ 수요일 체크리스트

- [x] 리스트 보기 모드 CSS 스타일링
- [x] 뉴스 리스트 크롤링

### ✅ 목요일 체크리스트

- [x] 자바스크립트로 초기 화면 셋팅
- [x] 다음 페이지 버튼 기능 구현
- [x] 카테고리 버튼 기능 구현

### ✅ 금요일 체크리스트

- [x] 20초마다 다음 언론사 나타는 기능 구현
- [x] 프로그래스바 애니메이션 구현

</div>
</details>

<details>
<summary>Week_3</summary>
<div markdown="1">

### ✅ 월요일 체크리스트

- [x] 그리드 보기 이미지 데이터 재정비
- [x] 서버 연동, http 요청 학습
- [x] json-server 사용해보기

### ✅ 화요일 체크리스트

- [x] 서버 연동으로 구독하기 버튼 활성화 시도
- [x] 기존 코드 store 객체 활용한 형태로 바꿔보기

### ✅ 수요일 체크리스트

- [x] 기존 코드 store 객체 활용한 형태로 모두 바꾸기

### ✅ 목요일 체크리스트

- [x] 전체언론사 그리드보기 호버 시 구독/해지 버튼
- [x] 내가 구독한 언론사 그리드 보기 기능 추가
- [x] 구독하기/해지하기 버튼 눌렀을 때 스낵바 기능 추가

</div>
</details>
