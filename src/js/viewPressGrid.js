let currentPage = 0;
const itemsPerPage = 24;
const LAST_PAGE = 3;
const FIRST_PAGE = 0;

const pressArr = await getLogoImgSrc();
const gridWrap = document.querySelector(".press-grid-wrap");
const nextButton = document.querySelector(".right-button");
const prevButton = document.querySelector(".left-button");
const pageData = { currentPage, itemsPerPage };

export async function initPressGridView() {
  viewPressLogo(pageData, pressArr, gridWrap);

  nextButton.addEventListener("click", gotoNextGridPage);

  prevButton.addEventListener("click", gotoPrevGridPage);
}

export function switchToGridByViewer() {
  const girdViewer = document.querySelector(".viewer-grid");
  const listViewer = document.querySelector(".viewer-list");
  const listWrap = document.querySelector(".press-list-wrap");

  girdViewer.addEventListener("click", (event) => {
    girdViewer.classList.toggle("on");
    listViewer.classList.toggle("on");
    listWrap.classList.toggle("display-none");
    gridWrap.classList.toggle("display-none");

    renderBtnByGridPage();
  });
}

async function getLogoImgSrc() {
  try {
    const response = await fetch("./data/gridPress.json");
    const imgData = await response.json();
    // const imgSrcArr = Object.values(imgData).map((obj) => obj.src);
    // const shuffledImgSrcArr = imgSrcArr.sort(() => Math.random() - 0.5);
    return imgData;
  } catch (err) {
    console.error("JSON 파일을 가져오는 도중 에러 발생.", err);
  }
}

function viewPressLogo(pageData, logoSrcArr) {
  const startIndex = pageData.currentPage * itemsPerPage;
  const endIndex = startIndex + pageData.itemsPerPage;

  logoSrcArr.slice(startIndex, endIndex).forEach(addPressLogoAndBox);
}

const addPressLogoAndBox = (obj) => {
  const newPressBox = document.createElement("div");
  const newsLogo = document.createElement("img");
  newsLogo.src = obj.brandMark;
  newsLogo.alt = obj.pressName;
  newPressBox.classList.add("press-box");
  newsLogo.classList.add("press-logo");
  newPressBox.append(newsLogo);
  gridWrap.appendChild(newPressBox);

  renderBtnByGridPage();
};

const gotoNextGridPage = (event) => {
  if (!gridWrap.classList.contains("display-none")) {
    pageData.currentPage++;
    clearPressGrid();
    viewPressLogo(pageData, pressArr, gridWrap);
  }
};

const gotoPrevGridPage = (event) => {
  if (!gridWrap.classList.contains("display-none")) {
    pageData.currentPage--;
    clearPressGrid();
    viewPressLogo(pageData, pressArr, gridWrap);
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
