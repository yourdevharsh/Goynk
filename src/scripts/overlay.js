import { getCurrentWindow } from "@tauri-apps/api/window";
import { showOverlay } from "./util";

window.addEventListener('DOMContentLoaded', async () => {
  const overlayWin = getCurrentWindow();

  await overlayWin.setFullscreen(true);

  showOverlay(true);
});