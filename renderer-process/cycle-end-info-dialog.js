import { ipcRenderer } from 'electron';

class CycleEndInfoDialog {

    show() {
        ipcRenderer.send('open-cycle-end-info-dialog');
    }
}

export { CycleEndInfoDialog as default }