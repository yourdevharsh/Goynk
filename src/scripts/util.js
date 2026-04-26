import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

export function showBlack(isSoundEnabled = false) {
  const black = new WebviewWindow("black", {
    url: "src/views/black.html",
    alwaysOnTop: true,
    resizable: false,
    decorations: false,
    skipTaskbar: true,
    transparent: true,
    fullscreen: true,
    visible: false
  });
  black.once("tauri://created", function () {
    if (isSoundEnabled) {
        playSound();
      }
    setTimeout(() => {
      black.close();
    }, 2000);
  });
}

export function showPopup(isSoundEnabled = false) {
  const popup = new WebviewWindow("overlay", {
    url: "src/views/popup.html",
    alwaysOnTop: true,
    resizable: false,
    decorations: false,
    skipTaskbar: true,
    transparent: true,
    visible: false,
    fullscreen: true
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

export function startBlinking(blinkMode, blinkTime, blinkWay, soundStatus) {
  switch (blinkMode) {
    case "idealMode":
      setInterval(() => {
        showOverlay(blinkWay, soundStatus);
      }, getBlinkTime(blinkTime)*1000);
      break;
  
    default:
      break;
  }
}

function getBlinkTime(blinkTime) {
  switch (blinkTime) {
    case "threeSec":
      return 3;
      break;

    case "fourSec":
      return 4;
      break;

    case "fiveSec":
      return 5;
      break;

    default:
      break;
  }
}

function showOverlay(blinkWay, soundStatus) {
  switch (blinkWay) {
    case "blackOverlay":
      showBlack(getSoundStatus(soundStatus));
      break;

    case "textPopup":
      showPopup(getSoundStatus(soundStatus));
      break;

    case "onlySound":
      playSound();
      break;

    default:
      break;
  }
}

function getSoundStatus(soundStatus) {
  if (soundStatus == "soundEnabled") {
    return true;
  }
  return false;
}