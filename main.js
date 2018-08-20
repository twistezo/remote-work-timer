import { app, BrowserWindow } from 'electron';
import Devtron from 'devtron';
import path from 'path';
import glob from 'glob';

export default class ElectronApp {
  constructor() {
    this.mainWindow = null;
    this.process = process;
    this.debug = /--debug/.test(this.process.argv[3]);
  }

  init() {
    const shouldQuit = this.makeSingleInstance()
    if (shouldQuit) return app.quit()

    this.loadMainProcessFiles()

    app.on('ready', () => {
      this.createWindow()
    })

    app.on('window-all-closed', () => {
      if (this.process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('activate', () => {
      if (this.mainWindow === null) {
        this.createWindow()
      }
    })
  }

  createWindow() {
    this.mainWindow = new BrowserWindow({ width: 800, height: 600 })
    this.mainWindow.loadFile('index.html')

    if (this.debug) {
      this.mainWindow.webContents.openDevTools()
      Devtron.install()
    }

    this.mainWindow.on('closed', function () {
      this.mainWindow = null
    })
  }

  makeSingleInstance() {
    if (this.process.mas) return false

    return app.makeSingleInstance(() => {
      if (this.mainWindow) {
        if (this.mainWindow.isMinimized()) this.mainWindow.restore()
        this.mainWindow.focus()
      }
    })
  }

  loadMainProcessFiles() {
    const files = glob.sync(path.join(__dirname, 'main-process/*.js'))
    files.forEach((file) => { require(file) })
  }
}

new ElectronApp().init();