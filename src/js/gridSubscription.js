export function viewGridSubsBtn() {
  const pressBoxes = document.querySelectorAll(".press-box");
  pressBoxes.forEach((pressBox) => {
    const subsBtn = document.createElement("span");
    subsBtn.innerText = "+ 구독하기";
    subsBtn.classList.add("subs", "pointer");
    pressBox.appendChild(subsBtn);
  });
}
