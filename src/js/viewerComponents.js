import { Store } from "./store.js";

const store = new Store();
store.addObserver(renderViewer);

export function initViewer() {
  const viewerBox = document.querySelector(".viewer");

  viewerBox.addEventListener("click", function (event) {
    if (event.target.classList.contains("viewer-grid")) {
      store.setState({ viewType: "grid" });
      console.log(store.getState());
    } else if (event.target.classList.contains("viewer-list")) {
      store.setState({ viewType: "list" });
      console.log(store.getState());
    }
  });

  // 초기 렌더링 실행
  renderViewer(store.getState());
}

function renderViewer(state) {
  const viewType = state.viewType;
  const gridViewer = document.querySelector(".viewer-grid");
  const listViewer = document.querySelector(".viewer-list");
  if (viewType === "grid") {
    gridViewer.classList.add("on");
    listViewer.classList.remove("on");
  } else if (viewType === "list") {
    listViewer.classList.add("on");
    gridViewer.classList.remove("on");
  }
}
