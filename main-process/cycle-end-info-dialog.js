import { ipcMain, dialog } from 'electron';

ipcMain.on('open-cycle-end-info-dialog', (event) => {
    const options = {
        type: 'info',
        title: 'Information',
        message: "Good job! You finished working today.",
        buttons: ['Ok. I promise that I will leave the computer']
    }
    dialog.showMessageBox(options, (index) => {
        event.sender.send('cycle-end-info-dialog', index)
    })
})
