class Data {
    constructor() {
        this.daysData = [];
    }

    pushDay(dayData) {
        this.daysData.push(dayData);
    }

    pushCycle(cycleData) {
        if (this.daysData.length > 0) {
            let lastDay = this.daysData[this.daysData.length - 1];
            if (lastDay.date.getDate() != cycleData.dateFrom.getDate() &&
                lastDay.date.getMonth() != cycleData.dateFrom.getMonth() &&
                lastDay.date.getFullYear() != cycleData.dateFrom.getFullYear()) {
                let dayData = new DayData();
                dayData.pushCycle(cycleData);
                this.pushDay(dayData);
                console.log('Data was not empty; Cycle date diffrent from last;');
                console.log(this.daysData);
            } else {
                lastDay.pushCycle(cycleData);
                console.log('Data was not empty; Cycle date the same as last;');
                console.log(this.daysData);
            }
        } else {
            let dayData = new DayData();
            dayData.pushCycle(cycleData);
            this.pushDay(dayData);
            console.log('Data was empty');
            console.log(this.daysData);
        }
    }
}

class DayData {
    constructor() {
        this.date = new Date();
        this.cyclesData = [];
    }

    pushCycle(cycleData) {
        this.cyclesData.push(cycleData);
    }
}

class CycleData {
    constructor(dateFrom, dateTo) {
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        let diff = (dateTo - dateFrom) / 1000; // [s]
        this.duration = Math.round(diff);
    }
}

export { Data, DayData, CycleData }