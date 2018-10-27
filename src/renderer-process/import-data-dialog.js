import { ipcRenderer } from 'electron'

class ImportDataDialog {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer
    }

    listen() {
        const openFileButton = document.getElementById('import-data')
        openFileButton.addEventListener('click', () => {
            ipcRenderer.send('import-data-dialog')
        })

        ipcRenderer.on('selected-data-file', (_event, path) => {
            // document.getElementById('data-file-path').textContent = `${path}`
            this.mainRenderer.data.tryLoadFromFile(`${path}`)
            this.mainRenderer.settings.setDataFilePath(`${path}`)
            this.mainRenderer.settings.listen()
        })
    }
}

export { ImportDataDialog as default }