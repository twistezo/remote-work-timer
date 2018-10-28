import fs from 'fs'
import ImportDataDialog from './import-data-dialog'
import ImportSettingsDialog from './import-settings-dialog'
import FakeDataGenerator from '../assets/fake-data-generator'

class Settings {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer
        this.defaultPath = 'settings.json'
        this.dataFilePath = ''
        this.settingsFilePath = ''
        this.dailyWorkingTime = { hours: 0, minutes: 0, seconds: 5 }
        this.importDataDialog = new ImportDataDialog(this.mainRenderer)
        this.importSettingsDialog = new ImportSettingsDialog(this.mainRenderer)
        this.fakeDataGenerator = new FakeDataGenerator()
        this.tryLoadFromFile(this.defaultPath)
    }

    listen() {
        const hoursElement = document.querySelector('#daily-working-time-hours')
        const minutesElement = document.querySelector('#daily-working-time-minutes')
        const secondsElement = document.querySelector('#daily-working-time-seconds')
        const fakeDataGeneratorElement = document.querySelector('#generate-fake-data')

        hoursElement.oninput = () => {
            this.dailyWorkingTime.hours = parseInt(hoursElement.value, 10)
            this.tryWriteSettingsToFile(this.defaultPath)
            this.updateTimerData()
        }
        minutesElement.oninput = () => {
            this.dailyWorkingTime.minutes = parseInt(minutesElement.value, 10)
            this.tryWriteSettingsToFile(this.defaultPath)
            this.updateTimerData()
        }
        secondsElement.oninput = () => {
            this.dailyWorkingTime.seconds = parseInt(secondsElement.value, 10)
            this.tryWriteSettingsToFile(this.defaultPath)
            this.updateTimerData()
        }
        fakeDataGeneratorElement.onclick = () => {
            this.fakeDataGenerator.generate()
            this.fakeDataGenerator.tryWriteToFile()
            this.setDataFilePath(this.fakeDataGenerator.getFilePath())
        }

        this.importDataDialog.listen()
        this.importSettingsDialog.listen()
        this.render()
    }

    render() {
        this.setInputById('#daily-working-time-hours', this.dailyWorkingTime.hours)
        this.setInputById('#daily-working-time-minutes', this.dailyWorkingTime.minutes)
        this.setInputById('#daily-working-time-seconds', this.dailyWorkingTime.seconds)

        const dataFilePathElement = document.getElementById('data-file-path')
        const settingsFilePathElement = document.getElementById('settings-file-path')
        this.renderPaths(dataFilePathElement, settingsFilePathElement)
    }

    renderPaths(dataFilePathEl, settingsFilePathEl) {
        if (this.dataFilePath) {
            dataFilePathEl.textContent = this.dataFilePath
        }
        if (this.settingsFilePath) {
            settingsFilePathEl.textContent = this.settingsFilePath
        }
    }

    setInputById(inputId, value) {
        const input = document.querySelector(inputId)
        if (input) {
            input.value = value
        }
    }

    tryLoadFromFile(path) {
        fs.readFile(path, 'utf8', (err, data) => {
            if (!err) {
                let rawData = JSON.parse(data)
                this.dailyWorkingTime.hours = rawData.hours
                this.dailyWorkingTime.minutes = rawData.minutes
                this.dailyWorkingTime.seconds = rawData.seconds
                this.setSettingsFilePath(path)
                this.updateTimerData()

                if (this.isSettingsTabActive()) {
                    this.render()
                }
            } else {
                this.tryWriteSettingsToFile(path)
            }
        })
    }

    tryWriteSettingsToFile(path) {
        fs.writeFile(path, JSON.stringify(this.dailyWorkingTime, null, 4), (err) => {
            if (!err) {
                this.setSettingsFilePath(path)
                this.updateTimerData()
            }
        })
    }

    updateTimerData() {
        this.mainRenderer.timer.setDailyWorkingTime(this.getDailyWorkingTimeInSec())
        this.mainRenderer.timer.setDuration(this.getDailyWorkingTimeInSec())
        if (this.mainRenderer.timer.isTimerTabActive()) {
            this.mainRenderer.timer.render()
        }
    }

    getDailyWorkingTimeInSec() {
        const seconds = (this.dailyWorkingTime.hours * 3600) + (this.dailyWorkingTime.minutes * 60)
            + this.dailyWorkingTime.seconds
        return seconds
    }

    setDataFilePath(path) {
        this.dataFilePath = path
        if (this.isSettingsTabActive()) {
            this.render()
        }
    }

    setSettingsFilePath(path) {
        this.settingsFilePath = path
        if (this.isSettingsTabActive()) {
            this.render()
        }
    }

    isSettingsTabActive() {
        return (
            this.mainRenderer.templateManager.TabsEnum.SETTINGS
            == this.mainRenderer.templateManager.activeTab
        )
    }

}

export { Settings as default }