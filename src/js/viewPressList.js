export function switchToListByViewer() {
  const listViewer = document.querySelector(".viewer-list");
  const girdViewer = document.querySelector(".viewer-grid");

  listViewer.addEventListener("click", (event) => {
    listViewer.classList.add("on");
    girdViewer.classList.remove("on");
    const pressBoxes = document.querySelectorAll(".press-box");
    pressBoxes.forEach((pressBox) => pressBox.remove());
    viewPressList();
  });
}

function viewPressList() {
  const mainEl = document.querySelector("main");
  mainEl.classList.remove("press-grid", "center-alignment");
}
