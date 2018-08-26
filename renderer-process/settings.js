class Settings {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer;
        this.dailyHours = null;
        this.defaultDailyHours = 8;
        
        this.defaultDailyDuration = 70;
    }

    onInit() {
        const input = document.querySelector('#dailyHoursInput');
        input.value = this.defaultDailyHours;
    }

    listen() {
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