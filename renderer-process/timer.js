import { CycleData } from '../assets/data';
import CycleEndInfoDialog from './cycle-end-info-dialog';

class Timer {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer;
        this.startButton = document.querySelector('#startButton');
        this.resetButton = document.querySelector('#resetButton');
        this.counter = null;
        this.startDate = null;
        this.isRunning = false;
        this.shouldReset = false;
        this.displayedTime = { hours: 0, minutes: 0, seconds: 0 }
        this.duration = null; // [s]
        this.elapsed = null; // [s]
        this.tempCycleData = { dateFrom: null, dateTo: null };
        this.resetDuration();
    }

    listenButtons() {
        this.startButton.onclick = () => {
            this.isRunning = !this.isRunning;
            if (this.isRunning) {
                this.startCycle();
                this.switchButtonToPause(this.startButton);
            } else {
                this.pushCycle();
                this.switchButtonToStart(this.startButton);
                this.duration = this.elapsed;
            }
            this.resetStartDate();
            this.counter = setInterval(() => {
                if (this.isRunning) {
                    this.count()
                }
            }, 1000);
        };

        this.resetButton.onclick = () => {
            this.shouldReset = true;
            this.resetCounter();
        };
    }

    count() {
        let diff = this.duration - (((Date.now() - this.startDate) / 1000) | 0);
        this.elapsed = diff;
        this.displayedTime = this.secondsToHMS(diff)

        if (this.mainRenderer.TabsEnum.TIMER == this.mainRenderer.activeTab) {
            this.renderTime();
        }
        if (diff <= 0 || this.shouldReset) {
            clearInterval(this.counter);
            this.resetCounter();
            this.pushCycle();
        }
        if (diff <= 0) {
            new CycleEndInfoDialog().show();
        }
    }

    startCycle() {
        this.tempCycleData.dateFrom = new Date();
    }

    pushCycle() {
        this.mainRenderer.data.pushCycle(
            new CycleData(this.tempCycleData.dateFrom, new Date())
        );
    }

    resetDuration() {
        this.setDuration(this.mainRenderer.settings.getDailyWorkingTimeInSec());
    }

    setDuration(seconds) {
        this.displayedTime = this.secondsToHMS(seconds);
        this.duration = seconds;
    }

    resetElapsed() {
        this.elapsed = this.duration;
    }

    resetStartDate() {
        this.startDate = Date.now();
    }

    resetCounter() {
        this.resetDuration();
        this.resetStartDate();
        this.isRunning = false;
        this.shouldReset = false;
        this.switchButtonToStart(this.startButton);
        this.renderTime();
    }

    renderTime() {
        document.querySelector('#remainingTime').textContent =
            this.displayedTime.hours + ':' + this.displayedTime.minutes
            + ':' + this.displayedTime.seconds;
    }

    secondsToHMS(seconds_number) {
        var hours = Math.floor(seconds_number / 3600);
        var minutes = Math.floor((seconds_number - (hours * 3600)) / 60);
        var seconds = seconds_number - (hours * 3600) - (minutes * 60);
        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return { hours, minutes, seconds };
    }

    switchButtonToPause(startButton) {
        startButton.innerHTML = 'Pause';
        startButton.className = 'btn btn-warning';
    }

    switchButtonToStart(startButton) {
        startButton.innerHTML = 'Start';
        startButton.className = 'btn btn-success';
    }
}

export { Timer as default }