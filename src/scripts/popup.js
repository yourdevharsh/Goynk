import { getCurrentWindow } from "@tauri-apps/api/window";

window.addEventListener('DOMContentLoaded', async () => {
  const popupWin = getCurrentWindow();

  await popupWin.setFullscreen(true);
});