import { ipcRenderer } from 'electron'

class ImportSettingsDialog {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer
    }

    listen() {
        const openFileButton = document.getElementById('import-settings')
        openFileButton.addEventListener('click', () => {
            ipcRenderer.send('import-settings-dialog')
        })

        ipcRenderer.on('selected-settings-file', (_event, path) => {
            // document.getElementById('settings-file-path').textContent = `${path}`
            this.mainRenderer.settings.tryLoadFromFile(`${path}`)
            this.mainRenderer.settings.setSettingsFilePath(`${path}`)
            this.mainRenderer.settings.listen()
        })
    }
}

export { ImportSettingsDialog as default }