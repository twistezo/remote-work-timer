import { ipcRenderer } from 'electron'

class OpenFileDialog {
    listen() {
        const openFileButton = document.getElementById('open-file')

        openFileButton.addEventListener('click', () => {
            ipcRenderer.send('open-file-dialog')
        })

        ipcRenderer.on('selected-file', (_event, path) => {
            document.getElementById('data-file-path').textContent = `${path}`
        })
    }
}

export { OpenFileDialog as default }