import fs from 'fs'
import FakeDataGenerator from './fake-data-generator'

class Data {
    constructor(Charts, withFakeGenerator) {
        this.charts = Charts
        this.fakeDataGenerator = new FakeDataGenerator()
        if (withFakeGenerator) {
            this.withFakeGenerator()
        }
        this.tryLoadFromFile('data.json')
        this.daysData = []
    }

    withFakeGenerator() {
        this.fakeDataGenerator.generate()
        this.fakeDataGenerator.tryWriteToFile()
    }

    pushDay(dayData) {
        this.daysData.push(dayData)
    }

    pushCycle(cycleData) {
        if (this.daysData.length == 0) {
            // Data is empty
            let dayData = new DayData()
            dayData.pushCycle(cycleData)
            this.pushDay(dayData)
        } else {
            // Data is not empty
            let lastDay = this.daysData[this.daysData.length - 1]
            if (lastDay.date.getDate() != cycleData.dateFrom.getDate() ||
                lastDay.date.getMonth() != cycleData.dateFrom.getMonth() ||
                lastDay.date.getFullYear() != cycleData.dateFrom.getFullYear()) {
                // Date of inserted `Cycle` is diffrent from last in `Data`
                let dayData = new DayData()
                dayData.pushCycle(cycleData)
                this.pushDay(dayData)
                // Date of inserted `Cycle` is the same as last in `Data`
            } else {
                lastDay.pushCycle(cycleData)
            }
        }
        this.tryWriteToFile()
    }

    tryLoadFromFile(path) {
        fs.readFile(path, 'utf8', (err, data) => {
            if (!err) {
                let rawData = JSON.parse(data)
                this.daysData = this.parseRawData(rawData)
                if (this.withFakeGenerator) {
                    this.charts.importData(this.daysData)
                }
            } else if (err) console.log(err)

        })
    }

    tryWriteToFile() {
        let data = JSON.stringify(this.daysData, null, 4)
        fs.writeFile('data.json', data, (err) => {
            if (err) console.log(err)
        })
    }

    parseRawData(rawData) {
        let daysData = []
        for (let i = 0; i <= rawData.length - 1; i++) {
            let dayData = new DayData()
            dayData.date = new Date(rawData[i].date)
            for (let j = 0; j <= rawData[i].cyclesData.length - 1; j++) {
                dayData.cyclesData.push(
                    new CycleData(
                        new Date(rawData[i].cyclesData[j].dateFrom),
                        new Date(rawData[i].cyclesData[j].dateTo)
                    )
                )
            }
            daysData.push(dayData)
        }
        return daysData
    }
}

class DayData {
    constructor() {
        this.date = new Date()
        this.cyclesData = []
    }

    pushCycle(cycleData) {
        this.cyclesData.push(cycleData)
    }
}

class CycleData {
    constructor(dateFrom, dateTo) {
        this.dateFrom = dateFrom
        this.dateTo = dateTo
        let diff = (dateTo - dateFrom) / 1000 // [s]
        this.duration = Math.round(diff)
    }
}

export { Data, DayData, CycleData }