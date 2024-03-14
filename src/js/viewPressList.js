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
let totalPage = 81;

const listWrap = document.querySelector(".press-list-wrap");
const pressInfoBox = document.querySelector(".press-info");
const nextButton = document.querySelector(".right-button");
const prevButton = document.querySelector(".left-button");

export function switchToListByViewer() {
  const listViewer = document.querySelector(".viewer-list");
  const girdViewer = document.querySelector(".viewer-grid");
  const gridWrap = document.querySelector(".press-grid-wrap");

  listViewer.addEventListener("click", (event) => {
    listViewer.classList.add("on");
    girdViewer.classList.remove("on");
    listWrap.classList.remove("display-none");
    gridWrap.classList.add("display-none");
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
  displayListPage(currentPage);
  nextButton.addEventListener("click", gotoNextListPage);
  prevButton.addEventListener("click", gotoPrevListPage);
}

function displayListPage(index) {
  const pressObj = category[index];
  const pressInfoHtml = `<span><img src="${pressObj.brandMark}"></span>
  <span class="edit-date">${pressObj.editDate}</span>
  <button class="subs-btn">+ 구독하기</button>`;
  pressInfoBox.innerHTML = pressInfoHtml;
}

const gotoNextListPage = () => {
  if (!listWrap.classList.contains("display-none")) {
    currentPage++;
    console.log(`리스트 페이지 ${currentPage}`);
    displayListPage(currentPage);
  }
};

const gotoPrevListPage = () => {
  if (!listWrap.classList.contains("display-none")) {
    currentPage--;
    console.log(`리스트 페이지 ${currentPage}`);
    displayListPage(currentPage);
  }
};
