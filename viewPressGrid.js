let currentPage = 0;
const itemsPerPage = 24;

const logoSrcArr = await getLogoImgSrc();
const pressGridEl = document.querySelector(".press-grid");
const nextButton = document.querySelector(".right-button");
const prevButton = document.querySelector(".left-button");
const pageData = { currentPage, itemsPerPage };

export async function viewPressGrid() {
  viewPressLogo(pageData, logoSrcArr, pressGridEl);

  nextButton.addEventListener("click", gotoNextPage);

  prevButton.addEventListener("click", gotoPrevPage);
}

async function getLogoImgSrc() {
  try {
    const response = await fetch("logoImg.json");
    const imgData = await response.json();
    const imgSrcArr = Object.values(imgData).map((obj) => obj.src);
    const shuffledImgSrcArr = imgSrcArr.sort(() => Math.random() - 0.5);
    return shuffledImgSrcArr;
  } catch (err) {
    console.error("JSON 파일을 가져오는 도중 에러 발생.", error);
    throw error;
  }
}

function viewPressLogo(pageData, logoSrcArr, pressGridEl) {
  const startIndex = pageData.currentPage * itemsPerPage;
  const endIndex = startIndex + pageData.itemsPerPage;

  logoSrcArr.slice(startIndex, endIndex).forEach(addChildEl);
}

const addChildEl = (src) => {
  const newPressBox = document.createElement("div");
  const newsLogo = document.createElement("img");
  newsLogo.src = src;
  newPressBox.classList.add("press-box");
  newsLogo.classList.add("press-logo");
  newPressBox.appendChild(newsLogo);
  pressGridEl.appendChild(newPressBox);
};

const gotoNextPage = (event) => {
  event.preventDefault();
  pageData.currentPage++;
  clearPressGrid();
  viewPressLogo(pageData, logoSrcArr, pressGridEl);
  if (pageData.currentPage === 3) nextButton.classList.add("hidden");
  if (pageData.currentPage !== 0) prevButton.classList.remove("hidden");
};

const gotoPrevPage = (event) => {
  event.preventDefault();
  pageData.currentPage--;
  clearPressGrid();
  viewPressLogo(pageData, logoSrcArr, pressGridEl);
  if (pageData.currentPage !== 3) nextButton.classList.remove("hidden");
  if (pageData.currentPage === 0) prevButton.classList.add("hidden");
};

function clearPressGrid() {
  const pressBoxes = document.querySelectorAll(".press-box");
  for (const pressBox of pressBoxes) {
    pressBox.remove();
  }
}
