import { CycleData } from '../assets/data'
import CycleEndInfoDialog from './cycle-end-info-dialog'

class Timer {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer
        this.startButton = null
        this.resetButton = null
        this.counter = null
        this.startDate = null
        this.isRunning = false
        this.shouldReset = false
        this.displayedTime = { hours: 0, minutes: 0, seconds: 0 }
        this.duration = null // [s]
        this.elapsed = null // [s]
        this.elapsedUpInCycle = null // [s]
        this.tempCycleData = { dateFrom: null, dateTo: null }
        this.dailyWorkingTime = null // [s]
        this.init()
    }

    init() {
        this.resetDuration()
    }

    listen() {
        this.startButton = this.getElement('#start-button')
        this.resetButton = this.getElement('#reset-button')
        if (this.isRunning) {
            this.switchButtonToPause(this.startButton)
        }
        this.listenButtons()
        this.render()
    }

    render() {
        let timeToCountDown = this.secondsToHMS(this.dailyWorkingTime)
        document.querySelector('#timeToCountDown').textContent =
            timeToCountDown.hours + ':' + timeToCountDown.minutes + ':'
            + timeToCountDown.seconds

        let elapsedUpTime = this.secondsToHMS(this.elapsedUpInCycle)
        document.querySelector('#elapsedUpTimeInCycle').textContent =
            elapsedUpTime.hours + ':' + elapsedUpTime.minutes + ':'
            + elapsedUpTime.seconds

        document.querySelector('#remainingTime').textContent =
            this.displayedTime.hours + ':' + this.displayedTime.minutes
            + ':' + this.displayedTime.seconds
    }

    getElement(string) {
        return document.querySelector(string)
    }


    listenButtons() {
        this.startButton.onclick = () => {
            this.isRunning = !this.isRunning
            if (this.isRunning) {
                this.startCycle()
                this.switchButtonToPause(this.startButton)
            } else {
                this.pushCycle()
                this.switchButtonToStart(this.startButton)
                this.duration = this.elapsed
            }
            this.resetStartDate()
            this.counter = setInterval(() => {
                if (this.isRunning) {
                    this.count()
                }
            }, 1000)
        }
        this.resetButton.onclick = () => {
            this.shouldReset = true
            this.resetCounter()
        }
    }

    count() {
        let elapsedTime = (((Date.now() - this.startDate) / 1000) | 0)
        this.elapsedUpInCycle = elapsedTime

        let diff = this.duration - elapsedTime
        this.elapsed = diff
        this.displayedTime = this.secondsToHMS(diff)

        if (this.isTimerTabActive()) {
            this.render()
        }
        if (diff <= 0 || this.shouldReset) {
            clearInterval(this.counter)
            this.resetCounter()
            this.pushCycle()
        }
        if (diff <= 0) {
            new CycleEndInfoDialog().show()
        }
    }

    startCycle() {
        this.tempCycleData.dateFrom = new Date()
    }

    pushCycle() {
        this.mainRenderer.data.pushCycle(
            new CycleData(this.tempCycleData.dateFrom, new Date())
        )
    }

    setDuration(seconds) {
        this.displayedTime = this.secondsToHMS(seconds)
        this.duration = seconds
    }

    resetDuration() {
        this.setDuration(this.mainRenderer.settings.getDailyWorkingTimeInSec())
    }

    resetElapsed() {
        this.elapsed = this.duration
    }

    resetStartDate() {
        this.startDate = Date.now()
    }

    resetCounter() {
        this.elapsedUpInCycle = 0
        this.resetDuration()
        this.resetStartDate()
        this.isRunning = false
        this.shouldReset = false
        this.switchButtonToStart(this.startButton)
        this.render()
    }

    secondsToHMS(seconds_number) {
        var hours = Math.floor(seconds_number / 3600)
        var minutes = Math.floor((seconds_number - (hours * 3600)) / 60)
        var seconds = seconds_number - (hours * 3600) - (minutes * 60)
        if (hours < 10) { hours = '0' + hours }
        if (minutes < 10) { minutes = '0' + minutes }
        if (seconds < 10) { seconds = '0' + seconds }
        return { hours, minutes, seconds }
    }

    switchButtonToPause(startButton) {
        startButton.innerHTML = 'Pause cycle'
        startButton.className = 'btn btn-warning'
    }

    switchButtonToStart(startButton) {
        startButton.innerHTML = 'Start cycle'
        startButton.className = 'btn btn-success'
    }

    setDailyWorkingTime(seconds) {
        this.dailyWorkingTime = seconds
    }

    isTimerTabActive() {
        return (
            this.mainRenderer.templateManager.TabsEnum.TIMER
            == this.mainRenderer.templateManager.activeTab
        )
    }
}

export { Timer as default }