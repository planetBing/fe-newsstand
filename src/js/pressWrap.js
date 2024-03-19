import { store } from "./store.js";

store.addObserver(initAllPressGird);
store.addObserver(initAllPressList);

const pressWrap = document.querySelector(".press-wrap");

function initAllPressGird() {
  const state = store.getState();
  if (state.viewType === "grid" && state.subsType === "off") {
    pressWrap.classList.toggle("grid");
    pressWrap.classList.toggle("list");
    console.log(pressWrap);
  }
}

export function initAllPressList() {
  const state = store.getState();
  if (state.viewType === "list" && state.subsType === "off") {
    pressWrap.classList.toggle("list");
    pressWrap.classList.toggle("grid");
    console.log(pressWrap);
  }
}

function initSubscribedPressGrid() {}

function initSubscribedPressList() {}
