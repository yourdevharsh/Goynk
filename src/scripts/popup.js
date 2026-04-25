import { getCurrentWindow } from "@tauri-apps/api/window";

window.addEventListener('DOMContentLoaded', async () => {
  const popupWin = getCurrentWindow();

  setTimeout(async () => {
    await popupWin.setFullscreen(true);
  }, 500);
});