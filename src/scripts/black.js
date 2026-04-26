import { getCurrentWindow } from "@tauri-apps/api/window";

window.addEventListener('DOMContentLoaded', async () => {
  const blackWin = getCurrentWindow();

  blackWin.show();
});