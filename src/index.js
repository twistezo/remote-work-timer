import { app, BrowserWindow } from 'electron'
import path from 'path'
import glob from 'glob'

if (require('electron-squirrel-startup')) {
    app.quit()
}

let mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        maximizable: false,
    })

    mainWindow.loadURL(`file://${__dirname}/index.html`)
    mainWindow.setMenuBarVisibility(false)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', () => {
    createWindow()
    loadMainProcessFiles()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

const loadMainProcessFiles = () => {
    const files = glob.sync(path.join(__dirname, '/main-process/*.js'))
    files.forEach((file) => { require(file) })
}