let currentPage = 0;
const itemsPerPage = 24;
const LAST_PAGE = 3;
const FIRST_PAGE = 0;

const logoSrcArr = await getLogoImgSrc();
const pressGridEl = document.querySelector(".press-grid-wrap");
const nextButton = document.querySelector(".right-button");
const prevButton = document.querySelector(".left-button");
const pageData = { currentPage, itemsPerPage };

export async function initPressGridView() {
  viewPressLogo(pageData, logoSrcArr, pressGridEl);

  nextButton.addEventListener("click", gotoNextGridPage);

  prevButton.addEventListener("click", gotoPrevGridPage);
}

export function switchToGridByViewer() {
  const girdViewer = document.querySelector(".viewer-grid");
  const listViewer = document.querySelector(".viewer-list");
  const listWrap = document.querySelector(".press-list-wrap");

  girdViewer.addEventListener("click", (event) => {
    girdViewer.classList.add("on");
    listViewer.classList.remove("on");
    listWrap.classList.add("display-none");
    pressGridEl.classList.remove("display-none");

    renderBtnByGridPage();
  });
}

async function getLogoImgSrc() {
  try {
    const response = await fetch("./data/logoImg.json");
    const imgData = await response.json();
    const imgSrcArr = Object.values(imgData).map((obj) => obj.src);
    const shuffledImgSrcArr = imgSrcArr.sort(() => Math.random() - 0.5);
    return shuffledImgSrcArr;
  } catch (err) {
    console.error("JSON 파일을 가져오는 도중 에러 발생.", err);
  }
}

function viewPressLogo(pageData, logoSrcArr) {
  const startIndex = pageData.currentPage * itemsPerPage;
  const endIndex = startIndex + pageData.itemsPerPage;

  logoSrcArr.slice(startIndex, endIndex).forEach(addPressLogoAndBox);
}

const addPressLogoAndBox = (src) => {
  const newPressBox = document.createElement("div");
  const newsLogo = document.createElement("img");
  const subsBtn = document.createElement("span");
  newsLogo.src = src;
  subsBtn.innerText = "+ 구독하기";
  newPressBox.classList.add("press-box");
  newsLogo.classList.add("press-logo");
  subsBtn.classList.add("subs", "pointer");
  newPressBox.appendChild(newsLogo);
  newPressBox.appendChild(subsBtn);
  pressGridEl.appendChild(newPressBox);

  renderBtnByGridPage();
};

const gotoNextGridPage = (event) => {
  if (!pressGridEl.classList.contains("display-none")) {
    pageData.currentPage++;
    console.log(`그리드 페이지 ${pageData.currentPage}`);
    clearPressGrid();
    viewPressLogo(pageData, logoSrcArr, pressGridEl);
  }
};

const gotoPrevGridPage = (event) => {
  if (!pressGridEl.classList.contains("display-none")) {
    pageData.currentPage--;
    console.log(`그리드 페이지 ${pageData.currentPage}`);
    clearPressGrid();
    viewPressLogo(pageData, logoSrcArr, pressGridEl);
  }
};

function clearPressGrid() {
  const pressBoxes = document.querySelectorAll(".press-box");
  for (const pressBox of pressBoxes) {
    pressBox.remove();
  }
}

function renderBtnByGridPage() {
  if (pageData.currentPage === LAST_PAGE) nextButton.classList.add("hidden");
  if (pageData.currentPage !== FIRST_PAGE)
    prevButton.classList.remove("hidden");
  if (pageData.currentPage !== LAST_PAGE) nextButton.classList.remove("hidden");
  if (pageData.currentPage === FIRST_PAGE) prevButton.classList.add("hidden");
}
