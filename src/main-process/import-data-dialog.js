import { ipcMain, dialog } from 'electron'

ipcMain.on('import-data-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, (files) => {
        if (files) {
            event.sender.send('selected-data-file', files)
        }
    })
})
