// IMPORT
import { getCurrentWindow, getAllWindows } from "@tauri-apps/api/window";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";

// HTML ELEMENTS
const dragAreaEl = document.getElementById('dragArea');
const pauseBtn = document.getElementById("pauseBtn");
const editBtn = document.getElementById("editBtn");
const closeBtn = document.getElementById("closeBtn");

// WINDOWS SELECTION
const floaterWindow = await getCurrentWindow();

dragAreaEl.addEventListener("mousedown", async (e) => {
  if (e.buttons === 1) {
    await floaterWindow.startDragging();
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
