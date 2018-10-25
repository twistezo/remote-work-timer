import fs from 'fs'
import ImportDataDialog from './import-data-dialog'
import ImportSettingsDialog from './import-settings-dialog'

class Settings {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer
        this.dailyWorkingTime = { hours: 0, minutes: 0, seconds: 5 }
        this.importDataDialog = new ImportDataDialog(this.mainRenderer)
        this.importSettingsDialog = new ImportSettingsDialog(this.mainRenderer)
        this.tryWriteToFile()
        this.tryLoadFromFile('settings.json')
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
            this.mainRenderer.timer.setDuration(this.getDailyWorkingTimeInSec())
            this.writeSettingsToFile()
        }
        minutesElement.oninput = () => {
            this.dailyWorkingTime.minutes = parseInt(minutesElement.value, 10)
            this.mainRenderer.timer.setDuration(this.getDailyWorkingTimeInSec())
            this.writeSettingsToFile()
        }
        secondsElement.oninput = () => {
            this.dailyWorkingTime.seconds = parseInt(secondsElement.value, 10)
            this.mainRenderer.timer.setDuration(this.getDailyWorkingTimeInSec())
            this.writeSettingsToFile()
        }
        this.importDataDialog.listen()
        this.importSettingsDialog.listen()
    }

    setInputById(inputId, value) {
        const input = document.querySelector(inputId)
        if (input) {
            input.value = value
        }
    }

    getDailyWorkingTimeInSec() {
        const seconds = (this.dailyWorkingTime.hours * 3600) + (this.dailyWorkingTime.minutes * 60)
            + this.dailyWorkingTime.seconds
        return seconds
    }

    tryWriteToFile() {
        if (!fs.existsSync('settings.json')) {
            this.writeSettingsToFile()
        }
    }

    writeSettingsToFile() {
        fs.writeFile('settings.json', JSON.stringify(this.dailyWorkingTime, null, 4), (err) => {
            if (err) console.log(err)
        })
    }

    tryLoadFromFile(path) {
        fs.readFile(path, 'utf8', (err, data) => {
            if (!err) {
                let rawData = JSON.parse(data)
                this.dailyWorkingTime.hours = rawData.hours
                this.dailyWorkingTime.minutes = rawData.minutes
                this.dailyWorkingTime.seconds = rawData.seconds
                this.mainRenderer.timer.setDuration(this.getDailyWorkingTimeInSec())
                if (this.isSettingsTabActive()) {
                    this.listen()
                }
            } else {
                console.log(err)
            }
        })
    }

    isSettingsTabActive() {
        return (
            this.mainRenderer.templateManager.TabsEnum.SETTINGS
            == this.mainRenderer.templateManager.activeTab
        )
    }

}

export { Settings as default }