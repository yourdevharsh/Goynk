// IMPORTS
import { Window } from "@tauri-apps/api/window";
import { Webview } from "@tauri-apps/api/webview";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { getCurrentWindow } from "@tauri-apps/api/window";

import { invoke } from "@tauri-apps/api/core";
import { show } from "@tauri-apps/api/app";

import { showBlack, showPopup, playSound } from "./util";

// DOM LOAD LISTENER

window.addEventListener("DOMContentLoaded", () => {
  // HTML ELEMENTS
  const blinkModeEl = document.getElementById("blinkMode");
  const blinkTimeEl = document.getElementById("blinkTime");
  const blinkWayEl = document.getElementById("blinkWay");
  const blinkSoundEl = document.getElementById("soundStatus");
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

  blinkWayEl.addEventListener("input", () => {
    if (blinkWayEl.value == "onlySound") {
      blinkSoundEl.value = "soundEnabled";
      blinkSoundEl.disabled = true;
      blinkSoundEl.title = "You can't disable sound in this way.";
    } else {
      blinkSoundEl.disabled = false;
    }
  });

  // MAIN SUBMIT BUTTON LISTENER
  submitBtn.addEventListener("click", async (e) => {
    // FLOATING WINDOW CREATION
    const existing = await WebviewWindow.getByLabel("floater");

    if (!existing) {
      const floater = new WebviewWindow("floater", {
        url: "src/views/floater.html",
        width: 144,
        height: 56,
        x: 1600,
        y: 150,
        decorations: false,
        alwaysOnTop: true,
        transparent: true,
        resizable: false,
        skipTaskbar: true,
      });

      floater.once("tauri://created", function () {
        const blinkMode = blinkModeEl.value;
        const blinkTime = blinkMode !== "idealMode" ? NaN : blinkTimeEl.value;
        const blinkWay = blinkWayEl.value;
        const soundStatus = blinkWay == "onlySound" ? "soundEnabled" : "soundDisabled";

        startBlinking(blinkMode, blinkTime, blinkWay, soundStatus);
      });
      floater.once("tauri://error", function (e) {
        console.log(e);
      });
    }

    getCurrentWindow().hide();
  });
});