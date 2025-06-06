const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('node:child_process');
const path = require("node:path");

let MAIN_WINDOW = null;
let RUNNING = false;
//let controls = {toggle: "CTRL"};
let pythonChildProccess = null;

function createWindow()
{
  const mainWindow = new BrowserWindow(
    {
        title: "Astroclick",
        width: 1000,
        height: 700,
        resizable: false,
        show: true,
        center: true,
        closable: true,
        frame: false,
        icon: path.join(__dirname, "resources/images/astroclick.png"),
        webPreferences:
        {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true
        }
    });

  mainWindow.loadFile('index.html');
  MAIN_WINDOW = mainWindow;

  //mainWindow.webContents.openDevTools()
}

app.whenReady().then(() =>
{
  createWindow();
});

ipcMain.on("window:close", () =>
{
    if(pythonChildProccess !== null) {pythonChildProccess.kill(); pythonChildProccess = null;}
    app.quit();
});
ipcMain.on("window:minimize", () =>
{
    MAIN_WINDOW.minimize();
});
ipcMain.handle("clicker:toggle", async () =>
{
  if(!RUNNING)
  {
    pythonChildProccess = spawn("python", [path.join(__dirname, "/resources/python/scripts/astroclick.py")]); // bp
    RUNNING = true;
    MAIN_WINDOW.minimize();
  }
  else
  {
    pythonChildProccess.kill();
    pythonChildProccess = null;
    RUNNING = false;
  }

  return RUNNING;
});