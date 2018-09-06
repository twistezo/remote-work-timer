import OpenFileDialog from './open-file'

class Settings {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer
        this.dailyWorkingTime = { hours: 0, minutes: 0, seconds: 5 }
        this.openFileDialog = new OpenFileDialog()
    }

    listen() {
        this.setInputById('#daily-working-time-hours', this.dailyWorkingTime.hours)
        this.setInputById('#daily-working-time-minutes', this.dailyWorkingTime.minutes)
        this.setInputById('#daily-working-time-seconds', this.dailyWorkingTime.seconds)

        const hoursElement = document.querySelector('#daily-working-time-hours')
        const minutesElement = document.querySelector('#daily-working-time-minutes')
        const secondsElement = document.querySelector('#daily-working-time-seconds')

        hoursElement.oninput = () => {
            this.dailyWorkingTime.hours = parseInt(hoursElement.value, 10)
            this.setTimer()
        }
        minutesElement.oninput = () => {
            this.dailyWorkingTime.minutes = parseInt(minutesElement.value, 10)
            this.setTimer()
        }
        secondsElement.oninput = () => {
            this.dailyWorkingTime.seconds = parseInt(secondsElement.value, 10)
            this.setTimer()
        }
        this.openFileDialog.listen()
    }

    setInputById(inputId, value) {
        const input = document.querySelector(inputId)
        if (input) {
            input.value = value
        }
    }

    setTimer() {
        this.mainRenderer.timer.setDuration(this.getDailyWorkingTimeInSec())
    }

    getDailyWorkingTimeInSec() {
        const seconds = (this.dailyWorkingTime.hours * 3600) + (this.dailyWorkingTime.minutes * 60)
            + this.dailyWorkingTime.seconds
        return seconds
    }
}

export { Settings as default }