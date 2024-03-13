export function switchToListByViewer() {
  const listViewer = document.querySelector(".viewer-list");
  const girdViewer = document.querySelector(".viewer-grid");
  const listWrap = document.querySelector(".press-list-wrap");
  const gridWrap = document.querySelector(".press-grid-wrap");

  listViewer.addEventListener("click", (event) => {
    listViewer.classList.add("on");
    girdViewer.classList.remove("on");
    listWrap.classList.remove("display-none");
    gridWrap.classList.add("display-none");
  });
}
