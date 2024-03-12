import { initPressGridView } from "./viewPressGrid.js";
import { handleReload, viewDate } from "./viewHeader.js";
import { initAndRollNews } from "./viewRollingNews.js";

function main() {
  handleReload();
  viewDate();
  initPressGridView();
  initAndRollNews();
}

main();
