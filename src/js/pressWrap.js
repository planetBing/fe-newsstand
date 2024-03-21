import { store } from "../../data/store.js";
import { initAllPressGridView } from "./viewPressGrid.js";
import { initAllPressListView } from "./viewPressList.js";
import { makeInnerBoxesInListWrap } from "../utils/htmlGenerators.js";

store.addObserver(convertAllPressGrid);
store.addObserver(convertAllPressList);

const pressWrap = document.querySelector(".press-wrap");

export async function initPressView() {
  convertAllPressGrid();
}

export function getSubscribedGridPressData() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/gridSubs")
      .then((response) => {
        if (!response.ok) throw new Error("Response is not ok!");
        const pressData = response.json();
        resolve(pressData);
      })
      .catch((err) => {
        console.error("JSON 파일을 가져오는 도중 에러 발생.", err);
        reject(err);
      });
  });
}

function convertAllPressGrid() {
  const state = store.getState();

  if (state.viewType === "grid" && state.subsType === "off") {
    pressWrap.classList.add("grid");
    pressWrap.classList.remove("list");
    let currentPage = 0;
    const itemsPerPage = 24;
    const pageData = { currentPage, itemsPerPage };
    getSubscribedGridPressData()
      .then((subsGridData) => {
        initAllPressGridView(subsGridData, pageData);
      })
      .catch((err) => {
        console.log("데이터 불러오는 중 오류 발생", err);
      });
  }
}

function convertAllPressList() {
  const state = store.getState();
  if (state.viewType === "list" && state.subsType === "off") {
    pressWrap.classList.add("list");
    pressWrap.classList.remove("grid");
    pressWrap.innerHTML = makeInnerBoxesInListWrap();
    initAllPressListView();
  }
}

function convertSubscribedPressGrid() {
  const state = store.getState();
}

function convertSubscribedPressList() {}
