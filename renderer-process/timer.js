class Timer {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer;

        this.counter = null;
        this.startDate = null;
        this.isRunning = false;
        this.shouldReset = false;

        this.displayedTime = { hours: 0, minutes: 0, seconds: 0 }
        this.duration = null;
        this.elapsed = null;
        this.resetDuration();
    }

    resetDuration() {
        this.setDuration(this.mainRenderer.settings.getDailyWorkingTimeInSec());
    }

    resetElapsed() {
        this.elapsed = this.duration;
    }

    setDuration(seconds) {
        this.displayedTime = this.secondsToHMS(seconds);
        this.duration = seconds;
    }

    listenButtons() {
        const startButton = document.querySelector('#startButton');
        const resetButton = document.querySelector('#resetButton');

        startButton.onclick = () => {
            this.isRunning = !this.isRunning;
            if (this.isRunning) {
                startButton.innerHTML = 'Pause';
                startButton.className = 'btn btn-warning';
            } else {
                startButton.innerHTML = 'Start';
                startButton.className = 'btn btn-success';
                this.duration = this.elapsed;
            }
            this.resetStartDate();
            this.counter = setInterval(() => {
                if (this.isRunning) {
                    this.count()
                }
            }, 1000);
        };

        resetButton.onclick = () => {
            this.shouldReset = true;
            this.resetCounter();
            startButton.innerHTML = 'Start';
            startButton.className = 'btn btn-success';
        };
    }

    resetStartDate() {
        this.startDate = Date.now();
    }

    count() {
        let diff = this.duration - (((Date.now() - this.startDate) / 1000) | 0); // [s]
        this.elapsed = diff;
        this.displayedTime = this.secondsToHMS(diff)

        if (this.mainRenderer.TabsEnum.TIMER == this.mainRenderer.activeTab) {
            this.renderTime();
        }
        if (diff <= 0 || this.shouldReset) {
            clearInterval(this.counter);
            this.resetCounter();
        }
    }

    resetCounter() {
        this.counter = null;
        this.startDate = null;
        this.isRunning = false;
        this.shouldReset = false;
        this.resetElapsed();
        this.resetDuration();
        this.renderTime();
    }

    renderTime() {
        document.querySelector('#remainingTime').textContent =
            this.displayedTime.hours + ':' + this.displayedTime.minutes
            + ':' + this.displayedTime.seconds;
    }

    secondsToHMS(sec_num) {
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return { hours, minutes, seconds };
    }
}

export { Timer as default }