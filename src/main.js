import { initPressGridView } from "./viewPressGrid.js";
import { handleReload, viewDate } from "./viewHeader.js";

function main() {
  handleReload();
  viewDate();
  initPressGridView();
}

main();
