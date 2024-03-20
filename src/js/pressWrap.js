import { store } from "../../data/store.js";
import { getLogoImgSrc, initAllPressGridView } from "./viewPressGrid.js";

store.addObserver(convertAllPressGrid);
store.addObserver(initAllPressList);

const pressWrap = document.querySelector(".press-wrap");

export function initPressView() {
  convertAllPressGrid();
}

function convertAllPressGrid() {
  const state = store.getState();

  if (state.viewType === "grid" && state.subsType === "off") {
    pressWrap.classList.add("grid");
    pressWrap.classList.remove("list");
    getLogoImgSrc()
      .then((pressArr) => {
        initAllPressGridView(pressArr);
      })
      .catch((err) => {
        console.log("데이터 불러오는 중 오류 발생", err);
      });
  }
}

function initAllPressList() {
  const state = store.getState();
  if (state.viewType === "list" && state.subsType === "off") {
    pressWrap.classList.add("list");
    pressWrap.classList.remove("grid");
    console.log(pressWrap);
  }
}

function initSubscribedPressGrid() {}

function initSubscribedPressList() {}
