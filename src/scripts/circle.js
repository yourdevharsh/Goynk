import { getCurrentWebview } from "@tauri-apps/api/webview";

const appWindow = getCurrentWindow();

document.getElementById('circle').addEventListener('mousedown', async (e) => {
  if (e.buttons === 1) {
    await appWindow.startDragging();
  }
})