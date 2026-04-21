import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

export function showOverlay(isSoundEnabled = false) {
  const overlay = new WebviewWindow("overlay", {
    url: "src/views/overlay.html",
    width: 1,
    height: 1,
    alwaysOnTop: true,
    resizable: false,
    decorations: false,
    skipTaskbar: true,
    transparent: false,
  });
  overlay.once("tauri://created", function () {
    setTimeout(() => {
      if (isSoundEnabled) {
        playSound();
      }
      overlay.close();
    }, 1500);
  });
}

export function showPopup(isSoundEnabled = false) {
  const popup = new WebviewWindow("overlay", {
    url: "src/views/popup.html",
    width: 1,
    height: 1,
    x: 0,
    y: 0,
    alwaysOnTop: true,
    resizable: false,
    decorations: false,
    skipTaskbar: true,
    transparent: true,
  });
  popup.once("tauri://created", function () {
    if (isSoundEnabled) {
      playSound();
    }
    setTimeout(() => {
      popup.close();
    }, 1500);
  });
}

export function playSound() {
  const mySound = new Audio("src/assets/blinkSound.mp3");

  mySound.play();
}
