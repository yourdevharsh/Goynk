// IMPORTS
import { Window } from "@tauri-apps/api/window";
import { Webview } from "@tauri-apps/api/webview";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { getCurrentWindow } from "@tauri-apps/api/window";

import { invoke } from "@tauri-apps/api/core";

// DOM LOAD LISTENER

window.addEventListener("DOMContentLoaded", () => {
  // HTML ELEMENTS
  const h1el = document.getElementById("heading");

  const blinkModeEl = document.getElementById("blinkMode");
  const blinkTimeEl = document.getElementById("blinkTime");
  const blinkWayEl = document.getElementById("blinkWay");
  const blinkSoundEl = document.getElementById("blinkSound");
  const submitBtn = document.getElementById("submitBtn");

  // MODE SETTING
  blinkModeEl.addEventListener("input", () => {
    if (blinkModeEl.value == "idealMode") {
      blinkTimeEl.disabled = false;
      blinkTimeEl.title = "";
    } else {
      blinkTimeEl.disabled = true;
      blinkTimeEl.title = "Select 'Ideal Mode' to enable this option.";
    }
  });

  // MAIN SUBMIT BUTTON LISTENER
  submitBtn.addEventListener("click", async (e) => {

    // FLOATING WINDOW CREATION
    const existing = await WebviewWindow.getByLabel("floater");

    if (!existing) {
      const floater = new WebviewWindow("floater", {
        url: "src/views/floater.html",
        width: 60,
        height: 60,
        decorations: false,
        alwaysOnTop: true,
        transparent: true,
        resizable: false,
        skipTaskbar: true,
      });

      floater.once("tauri://created", function () {
        console.log("Floater Created");
      });
      floater.once("tauri://error", function (e) {
        console.log(e);
      });
    }

    getCurrentWindow().hide();
  });
});
