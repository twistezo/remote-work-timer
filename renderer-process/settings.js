class Settings {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer;
        this.dailyHours = 8;
    }

    listenInputs() {
        this.dailyHours = this.listenForValueFromInputById('#dailyHoursInput');
    }

    // `inputId` e.x. `#someInputId`
    listenForValueFromInputById(inputId) {
        const input = document.querySelector(inputId);
        if (input) {
            input.oninput = () => {
                return input.value;
            }
        }
    }
}

export { Settings as default }