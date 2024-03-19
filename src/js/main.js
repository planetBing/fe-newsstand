import { initPressGridView, switchToGridByViewer } from "./viewPressGrid.js";
import { viewHeader } from "./viewHeader.js";
import { initAndRollNews } from "./viewRollingNews.js";
// import { switchToListByViewer, initPressListView } from "./viewPressList.js";
// import { subscribeGridPress } from "./gridSubscription.js";
import { initViewer, initSubsTap } from "./viewerAndTap.js";

function main() {
  viewHeader();
  initPressGridView();
  initAndRollNews();
  // switchToListByViewer();
  // switchToGridByViewer();
  // initPressListView();
  // subscribeGridPress();

  initViewer();
  initSubsTap();
}

main();
