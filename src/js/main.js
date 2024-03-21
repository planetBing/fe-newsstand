import { viewHeader } from "./header.js";
import { initAndRollNews } from "./rollingNews.js";
import { initViewer, initSubsTap } from "./viewerAndTap.js";
import { initPressView } from "./pressWrap.js";
import { handleSubscriptionOnClick } from "./gridSubscription.js";

function main() {
  viewHeader();
  initAndRollNews();
  initViewer();
  initSubsTap();
  initPressView();
  handleSubscriptionOnClick();
}

main();
