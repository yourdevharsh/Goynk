import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { getCurrentWebview } from '@tauri-apps/api/webview';

const { invoke } = window.__TAURI__.core;

const h1el = document.getElementById("heading");

const blinkModeEl = document.getElementById("blinkMode");
const blinkTimeEl = document.getElementById("blinkTime");
const blinkWayEl = document.getElementById("blinkWay");
const blinkSoundEl = document.getElementById("blinkSound");

blinkModeEl.addEventListener("click", () => {
  h1el.innerHTML = blinkModeEl.value;
});

window.addEventListener("DOMContentLoaded", () => {
  blinkModeEl.addEventListener("input", () => {
    if (blinkModeEl.value == "idealMode") {
      blinkTimeEl.disabled = false;
      blinkTimeEl.title = "";
    } else {
      blinkTimeEl.disabled = true;
      blinkTimeEl.title = "Select 'Ideal Mode' to enable this option.";
    }
  });

  document
    .querySelector("#greet-form")
    .addEventListener("submit", async (e) => {
      try {
        await getCurrentWindow().close();
      } catch (error) {
        console.log(error);
      }
    });
});

const win = new WebviewWindow("circle", {
  url: "/src/views/circle.html",
  width: 60,
  height: 60,
  decorations: false,
  alwaysOnTop: true,
  transparent: true,
  resizable: false,
  skipTaskbar: true,
});

win.once("tauri://created", function () {
  console.log("sksk");
});
win.once("tauri://error", function (e) {
  console.log(e);
});
