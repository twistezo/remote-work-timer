import fs from 'fs';

class Data {
    constructor() {
        this.daysData = [];
    }

    pushDay(dayData) {
        this.daysData.push(dayData);
    }

    pushCycle(cycleData) {
        if (this.daysData.length == 0) {
            console.log('Data was empty');
            let dayData = new DayData();
            dayData.pushCycle(cycleData);
            this.pushDay(dayData);
        } else {
            let lastDayDate = this.daysData[this.daysData.length - 1].date;
            if (lastDayDate.getDate() != cycleData.dateFrom.getDate() &&
                lastDayDate.getMonth() != cycleData.dateFrom.getMonth() &&
                lastDayDate.getFullYear() != cycleData.dateFrom.getFullYear()) {
                console.log('Data was not empty; Cycle date diffrent from last;');
                let dayData = new DayData();
                dayData.pushCycle(cycleData);
                this.pushDay(dayData);
            } else {
                console.log('Data was not empty; Cycle date the same as last;');
                lastDay.pushCycle(cycleData);
            }
        }
        this.saveToFile();
    }

    loadFromFile() {
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (!err) {
                let rawData = JSON.parse(data);
                this.daysData = this.parseRawData(rawData);
            }
        });
    }

    saveToFile() {
        let data = JSON.stringify(this.daysData, null, 4);
        fs.writeFile('data.json', data, (err) => {
            if (err) console.log(err);
        });
    }

    parseRawData(rawData) {
        let daysData = [];
        for (let i = 0; i <= rawData.length - 1; i++) {
            let dayData = new DayData();
            dayData.date = new Date(rawData[i].date);
            for (let j = 0; j <= rawData[i].cyclesData.length - 1; j++) {
                dayData.cyclesData.push(
                    new CycleData(
                        new Date(rawData[i].cyclesData[j].dateFrom),
                        new Date(rawData[i].cyclesData[j].dateTo)
                    )
                );
            }
            daysData.push(dayData);
        }
        return daysData;
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