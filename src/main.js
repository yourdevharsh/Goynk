const { invoke } = window.__TAURI__.core;


window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });
});
