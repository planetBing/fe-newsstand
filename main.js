let currentPage = 0;
const itemsPerPage = 24;

async function main() {
  //로고 json 데이터 가져오고
  //첫번째 페이지의 화면 보여주기
  //버튼 클릭 이벤트리스너 추가 => 버튼 누르면 currentPage 증가, 자식 요소 추가하는 콜백함수
  const logoSrcArr = await getLogoImgSrc();
  const pressGridEl = document.querySelector(".press-grid");
  const pageData = { currentPage, itemsPerPage };

  viewPressLogo(pageData, logoSrcArr, pressGridEl);

  const nextButton = document.querySelector(".right-button");
  nextButton.addEventListener("click", (event) => {
    event.preventDefault();
    pageData.currentPage++;
    clearPressGrid();
    viewPressLogo(pageData, logoSrcArr, pressGridEl);
    if (pageData.currentPage === 3) nextButton.remove();
  });
}

async function getLogoImgSrc() {
  try {
    const response = await fetch("logoImg.json");
    const imgData = await response.json();
    const arr = Object.values(imgData).map((imgObj) => imgObj);
    const imgSrcArr = arr.map((obj) => obj.src);
    return imgSrcArr;
  } catch (err) {
    console.error("JSON 파일을 가져오는 도중 에러 발생.", error);
    throw error;
  }
}

function viewPressLogo(pageData, logoSrcArr, pressGridEl) {
  const startIndex = pageData.currentPage * itemsPerPage;
  const endIndex = startIndex + pageData.itemsPerPage;

  logoSrcArr.slice(startIndex, endIndex).forEach((src) => {
    const newPressBox = document.createElement("div");
    const newsLogo = document.createElement("img");
    newsLogo.src = src;
    newPressBox.classList.add("press-box");
    newPressBox.appendChild(newsLogo);
    pressGridEl.appendChild(newPressBox);
  });
}

function clearPressGrid() {
  const pressBoxes = document.querySelectorAll(".press-box");
  for (const pressBox of pressBoxes) {
    pressBox.remove();
  }
}

main();
