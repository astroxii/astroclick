const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("buttonActions", 
{
    close: () => {ipcRenderer.send("window:close");},
    minimize: () => {ipcRenderer.send("window:minimize");},
    toggleClicker: async () => 
    {
        const isRunning = await ipcRenderer.invoke("clicker:toggle");
        const toggleBtn = document.getElementById("toggle-btn");
        const toggleBtnImg = document.querySelector("#toggle-btn img");
        const statusLabel = document.getElementById("clicker-status");
        toggleBtn.title = `${isRunning ? "Stop auto-clicker" : "Run auto-clicker"}`;
        toggleBtnImg.src = `${isRunning ? "./resources/images/pauseIcon.png" : "./resources/images/playIcon.png"}`;
        statusLabel.innerText = `${isRunning ? "Active" : "Inactive"}`;
        statusLabel.style.color = `${isRunning ? "green" : "orange"}`;
    }
});

contextBridge.exposeInMainWorld("ipc", {on: (event, callback) => {ipcRenderer.on(event, callback);}});