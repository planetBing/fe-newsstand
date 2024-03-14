import {
  economy,
  broadCast,
  it,
  english,
  sports,
  magazine,
  local,
} from "../../data/pressList.js";

let currentPage = 0;
let totalPage = 0;
let currentCategory = "";
const START_INDEX = 0;

const pressData = [
  { category: "종합/경제", is: economy },
  { category: "방송/통신", is: broadCast },
  { category: "IT", is: it },
  { category: "영자지", is: english },
  { category: "스포츠/연예", is: sports },
  { category: "매거진/전문지", is: magazine },
  { category: "지역", is: local },
];

const mainEl = document.querySelector("main");
const listWrap = mainEl.querySelector(".press-list-wrap");
const categoryNav = mainEl.querySelector(".category");
const pressInfoBox = mainEl.querySelector(".press-info");
const mainNewsBox = mainEl.querySelector(".news-list-left");
const newsListBox = mainEl.querySelector(".news-list-right ul");
const nextButton = mainEl.querySelector(".right-button");
const prevButton = mainEl.querySelector(".left-button");

export function switchToListByViewer() {
  const listViewer = document.querySelector(".viewer-list");
  const girdViewer = document.querySelector(".viewer-grid");
  const gridWrap = document.querySelector(".press-grid-wrap");

  listViewer.addEventListener("click", (event) => {
    listViewer.classList.toggle("on");
    girdViewer.classList.toggle("on");
    listWrap.classList.toggle("display-none");
    gridWrap.classList.toggle("display-none");
    nextButton.classList.remove("hidden");
    prevButton.classList.remove("hidden");
  });
}

export function initPressListView() {
  //일단 어떤 카테고리의 데이터를 가져올지 결정해야...
  // 카테고리가 결정되는 방법에는 1. 페이지 끝까지 도달한 경우 2. 카테고리 버튼을 클릭한 경우
  //초기 화면 그리기
  //페이지 넘기기 버튼
  //카테고리 버튼
  //20초마다 페이지 넘기기
  initializeListView();

  nextButton.addEventListener("click", gotoNextListPage);
  prevButton.addEventListener("click", gotoPrevListPage);
  categoryNav.addEventListener("click", gotoCategory);
}

function initializeListView() {
  currentCategory = pressData[START_INDEX].category;
  totalPage = pressData[START_INDEX].is.length - 1;
  displayListPage(currentCategory, currentPage);
}

function displayListPage(currentCategory, index) {
  const currentPressDic = pressData.find(
    (item) => item.category === currentCategory
  );
  const currentPressData = currentPressDic.is;
  const eachPressObj = currentPressData[index];

  const pressInfoHtml = makePressInfoHtml(eachPressObj);
  const mainNewsHtml = makeMainNewsHtml(eachPressObj);
  const newsListHtml = makeNewsListHtml(eachPressObj);
  pressInfoBox.innerHTML = pressInfoHtml;
  mainNewsBox.innerHTML = mainNewsHtml;
  newsListBox.innerHTML = newsListHtml;
}

function makePressInfoHtml(eachPressObj) {
  const html = `<span><img src="${eachPressObj.brandMark}"></span>
  <span class="edit-date">${eachPressObj.editDate}</span>
  <button class="subs-btn">+ 구독하기</button>`;
  return html;
}

function makeMainNewsHtml(eachPressObj) {
  const mainNewsData = eachPressObj.mainNews;
  const html = `<div class="news-list-left">
  <a href="${mainNewsData.link}"><img src="${mainNewsData.thumb}" alt="thumb"></a>
  <a href="${mainNewsData.link}">${mainNewsData.title}</a>
  </div>`;
  return html;
}

function makeNewsListHtml(eachPressObj) {
  const newsListDataArr = eachPressObj.newsList;

  let html = "";
  newsListDataArr.forEach((eachNews) => {
    html += `<li><a href="${eachNews.link}">${eachNews.title}</a></li>`;
  });
  html += `<div>${eachPressObj.pressName}에서 직접 편집한 뉴스입니다.</div>`;
  return html;
}

const gotoNextListPage = () => {
  if (!listWrap.classList.contains("display-none")) {
    currentPage++;
    console.log(`리스트 페이지 ${currentPage}`);
    displayListPage(currentCategory, currentPage);
  }
};

const gotoPrevListPage = () => {
  if (!listWrap.classList.contains("display-none")) {
    currentPage--;
    console.log(`리스트 페이지 ${currentPage}`);
    displayListPage(currentCategory, currentPage);
  }
};

const gotoCategory = (event) => {
  if (event.target.classList.contains("category-text")) {
    const categoryText = event.target.textContent;
    console.log(`Clicked on category: ${categoryText}`);
  }
};
