class Timer {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer;

        this.counter = null;
        this.startDate = null;
        this.isRunning = false;
        this.shouldReset = false;

        this.durationDefault = this.mainRenderer.settings.defaultDailyDuration;
        this.duration = this.durationDefault; // [s]
        this.elapsed = this.duration;
        this.fHours = null;
        this.fMinutes = null;
        this.fSeconds = null;
        this.initDefaultDisplayValues();
    }

    initDefaultDisplayValues() {
        this.fHours = this.formattedHoursFromSeconds(this.duration);
        this.fMinutes = this.formattedMinutesFromSeconds(this.duration);
        this.fSeconds = this.formattedSeconds(this.duration);
    }

    listenButtons() {
        const startButton = document.querySelector('#startButton');
        const resetButton = document.querySelector('#resetButton');
        if (startButton) {
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
        }
        if (resetButton) {
            resetButton.onclick = () => {
                this.shouldReset = true;
                this.resetCounter();
                startButton.innerHTML = 'Start';
                startButton.className = 'btn btn-success';
            };
        }
    }

    resetStartDate() {
        this.startDate = Date.now();
    }

    count() {
        let diff = this.duration - (((Date.now() - this.startDate) / 1000) | 0); // [s]
        this.elapsed = diff;
        this.fHours = this.formattedHoursFromSeconds(diff);
        this.fMinutes = this.formattedMinutesFromSeconds(diff);
        this.fSeconds = this.formattedSeconds(diff);

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
        this.duration = this.durationDefault;
        this.elapsed = this.duration;
        this.initDefaultDisplayValues();
        this.renderTime();
    }

    renderTime() {
        let displaElement = document.querySelector('#remainingTime');
        displaElement.textContent = this.formattedDispalyTime(
            this.fHours, this.fMinutes, this.fSeconds
        );
    }

    formattedDispalyTime(hours, minutes, seconds) {
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return hours + ':' + minutes + ':' + seconds;
    }

    formattedHoursFromSeconds(seconds) {
        return (seconds / 3600) | 0;
    }

    formattedMinutesFromSeconds(seconds) {
        return (seconds / 60) | 0;
    }

    formattedSeconds(seconds) {
        return (seconds % 60) | 0;
    }


}

export { Timer as default }