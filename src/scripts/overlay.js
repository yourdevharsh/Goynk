import { getCurrentWindow } from "@tauri-apps/api/window";
import { showOverlay } from "./util";

window.addEventListener('DOMContentLoaded', async () => {
  const overlayWin = getCurrentWindow();

  setTimeout(async () => {
    await overlayWin.setFullscreen(true);
  }, 500);
});