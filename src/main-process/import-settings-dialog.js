import { ipcMain, dialog } from 'electron'

ipcMain.on('import-settings-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, (files) => {
        if (files) {
            event.sender.send('selected-settings-file', files)
        }
    })
})
