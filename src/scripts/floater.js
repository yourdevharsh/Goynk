// IMPORT
import { getCurrentWindow, getAllWindows } from "@tauri-apps/api/window";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

// HTML ELEMENTS
const pauseBtn = document.getElementById("pauseBtn");
const editBtn = document.getElementById("editBtn");
const closeBtn = document.getElementById("closeBtn");

// WINDOWS SELECTION
const floaterWindow = getCurrentWindow();

// PAUSE LISTENER
pauseBtn.addEventListener('click', () => {
  if (pauseBtn.textContent === '⏸') {
    pauseBtn.textContent = '▶';
  } else {
    pauseBtn.textContent = '⏸';
  }

});

// EDIT LISTENER
editBtn.addEventListener("click", async () => {
  const windows = getAllWindows();
  const mainWindow = (await windows).find(w => w.label === 'main');

  if (mainWindow) {
    await mainWindow.show();
    await mainWindow.setFocus();
  }

  await floaterWindow.close();
});


// CLOSE LISTENER
closeBtn.addEventListener('click', async () => {
  const windows = getAllWindows();
  const mainWindow = (await windows).find(w => w.label === 'main');

  if (mainWindow) {
    await mainWindow.close();
  }

  await floaterWindow.close();
});
