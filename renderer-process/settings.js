class Settings {
    constructor() {
        this.dailyHours = 0;
        this.inputsListener();
    }

    inputsListener() {
        const input = document.querySelector('#dailyHoursInput');
        if (input) {
            input.oninput = () => {
                console.log('true');
            }
        }
    }

    setDailyHours(hours) {
        this.dailyHours = hours;
    }

    getDailyHours() {
        return this.dailyHours;
    }

    setInputValue(inputId, value) {
        const input = document.getElementById(inputId);
        input.value = value;
    }
}

export { Settings as default }