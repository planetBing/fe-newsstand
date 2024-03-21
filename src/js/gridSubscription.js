import {
  getSubsData,
  postSubsData,
  deleteSubsData,
} from "../utils/pressDataApi.js";

export function handleSubscriptionOnClick() {
  const gridWrap = document.querySelector(".grid");
  gridWrap.addEventListener("click", subscriptionCallback);
}

function subscriptionCallback(event) {
  if (event.target.innerText === "+ 구독하기") {
    subscribeGridPress(event);
  } else if (event.target.innerText === "- 해지하기") {
    unsubscribGridPress(event);
  }
}

function subscribeGridPress(event) {
  event.stopPropagation();
  event.preventDefault();
  const pressBox = event.target.parentNode;
  const imgEl = pressBox.querySelector(".press-logo");
  const pressName = imgEl.getAttribute("alt");
  const brandMark = imgEl.getAttribute("src");
  const pressData = { pressName: pressName, brandMark: brandMark };

  postSubsData("gridSubs", pressData);
}

async function unsubscribGridPress(event) {
  event.stopPropagation();
  event.preventDefault();
  const pressBox = event.target.parentNode;
  const imgEl = pressBox.querySelector(".press-logo");
  const pressName = imgEl.getAttribute("alt");
  const subsData = await getSubsData("gridSubs");
  const pressId = subsData.find((Obj) => Obj.pressName === pressName).id;

  deleteSubsData("gridSubs", pressId);
}
