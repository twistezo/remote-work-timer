class Settings {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer;
        this.dailyWorkingTime = { hours: 0, minutes: 0, seconds: 5 };
    }

    listen() {
        this.setInputById('#dailyWorkingTimeHours', this.dailyWorkingTime.hours);
        this.setInputById('#dailyWorkingTimeMinutes', this.dailyWorkingTime.minutes);
        this.setInputById('#dailyWorkingTimeSeconds', this.dailyWorkingTime.seconds);

        const hoursElement = document.querySelector('#dailyWorkingTimeHours');
        const minutesElement = document.querySelector('#dailyWorkingTimeMinutes');
        const secondsElement = document.querySelector('#dailyWorkingTimeSeconds');

        hoursElement.oninput = () => {
            this.dailyWorkingTime.hours = parseInt(hoursElement.value, 10);
            this.setTimer();
        }
        minutesElement.oninput = () => {
            this.dailyWorkingTime.minutes = parseInt(minutesElement.value, 10);
            this.setTimer();
        }
        secondsElement.oninput = () => {
            this.dailyWorkingTime.seconds = parseInt(secondsElement.value, 10);
            this.setTimer();
        }
    }

    setInputById(inputId, value) {
        const input = document.querySelector(inputId);
        if (input) {
            input.value = value;
        }
    }

    setTimer() {
        this.mainRenderer.timer.setDuration(this.getDailyWorkingTimeInSec());
    }

    getDailyWorkingTimeInSec() {
        const seconds = (this.dailyWorkingTime.hours * 3600) + (this.dailyWorkingTime.minutes * 60)
            + this.dailyWorkingTime.seconds
        return seconds;
    }
}

export { Settings as default }