// let currentPage = 0;
// const itemsPerPage = 24;
// const LAST_PAGE = 3;
// const FIRST_PAGE = 0;

// const pressArr = await getLogoImgSrc();
// const gridWrap = document.querySelector(".press-grid-wrap");
// const nextButton = document.querySelector(".right-button");
// const prevButton = document.querySelector(".left-button");
// const pageData = { currentPage, itemsPerPage };

export function initAllPressGridView(pressArr) {
  let currentPage = 0;
  const itemsPerPage = 24;
  const nextButton = document.querySelector(".right-button");
  const prevButton = document.querySelector(".left-button");
  const gridWrap = document.querySelector(".grid");
  const pageData = { currentPage, itemsPerPage };
  viewPressLogo(pageData, pressArr, gridWrap);

  nextButton.addEventListener("click", (event) =>
    gotoNextGridPage(event, pageData, pressArr, gridWrap)
  );

  prevButton.addEventListener("click", (event) =>
    gotoPrevGridPage(event, pageData, pressArr, gridWrap)
  );
}

export async function getLogoImgSrc() {
  try {
    const response = await fetch("./data/gridPress.json");
    const imgData = await response.json();
    const shuffledImgData = imgData.sort(() => Math.random() - 0.5);
    return shuffledImgData;
  } catch (err) {
    console.error("JSON 파일을 가져오는 도중 에러 발생.", err);
  }
}

function viewPressLogo(pageData, logoSrcArr, gridWrap) {
  const startIndex = pageData.currentPage * pageData.itemsPerPage;
  const endIndex = startIndex + pageData.itemsPerPage;

  logoSrcArr.slice(startIndex, endIndex).forEach((obj) => {
    const newPressBox = document.createElement("div");
    const newsLogo = document.createElement("img");
    const subsBtn = document.createElement("span");
    newsLogo.src = obj.brandMark;
    newsLogo.alt = obj.pressName;
    subsBtn.innerText = "+ 구독하기";
    newPressBox.classList.add("press-box");
    newsLogo.classList.add("press-logo");
    subsBtn.classList.add("subs", "pointer");
    newPressBox.append(newsLogo, subsBtn);
    gridWrap.appendChild(newPressBox);

    // renderBtnByGridPage();
  });
}

function gotoNextGridPage(event, pageData, pressArr, gridWrap) {
  if (!gridWrap.classList.contains("display-none")) {
    pageData.currentPage++;
    clearPressGrid();
    viewPressLogo(pageData, pressArr, gridWrap);
  }
}

function gotoPrevGridPage(event, pageData, pressArr, gridWrap) {
  if (!gridWrap.classList.contains("display-none")) {
    pageData.currentPage--;
    clearPressGrid();
    viewPressLogo(pageData, pressArr, gridWrap);
  }
}

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
