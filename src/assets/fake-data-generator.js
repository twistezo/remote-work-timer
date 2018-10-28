import fs from 'fs'

class FakeDataGenerator {
    constructor() {
        this.fakeData = null
        this.fakeDaysOff = 26
        this.filePath = 'data.json'
    }

    generate() {
        let dateFrom = new Date()
        dateFrom.setMonth(dateFrom.getMonth() - 12)
        let dateTo = new Date()
        let daysBetween = this.daysBetween(dateFrom, dateTo)

        // generate days off
        let fakeDaysOff = []
        for (let i = 0; i <= this.fakeDaysOff; i++) {
            fakeDaysOff.push(
                Math.round(
                    this.randomBetween(0, daysBetween)
                )
            )
        }

        let fakeData = []
        for (let i = 0; i <= daysBetween; i++) {
            let currentDay = this.addDays(dateFrom, i)
            // exclude weekends and days off
            if (currentDay.getDay() == 0 || currentDay.getDay() == 6 || fakeDaysOff.some((a) => a == i)) {
                continue
            }
            let currentDayCycleFrom = this.randomDateBetween(currentDay, currentDay, 7, 10)
            let currentDayCycleTo = this.randomDateBetween(currentDay, currentDay, 15, 18)

            let fakeDay = {
                date: currentDay,
                cyclesData: [
                    {
                        dateFrom: currentDayCycleFrom,
                        dateTo: currentDayCycleTo,
                        duration: currentDayCycleTo - currentDayCycleFrom / 1000,
                    }
                ]
            }
            fakeData.push(fakeDay)
        }
        this.fakeData = fakeData
    }

    daysBetween(dateFrom, dateTo) {
        return Math.abs(Math.round((dateFrom - dateTo) / (1000 * 60 * 60 * 24)))
    }

    addDays(date, days) {
        let result = new Date(date)
        result.setDate(result.getDate() + days)
        return result
    }

    // hours: 1-24
    randomDateBetween(start, end, startHour, endHour) {
        startHour = startHour + 1
        endHour = endHour + 1
        var date = new Date(+start + Math.random() * (end - start))
        var hour = startHour + Math.random() * (endHour - startHour) | 0
        date.setHours(hour)
        return date
    }

    // min - inclusive, max - exclusive
    randomBetween(min, max) {
        return Math.random() * (max - min) + min
    }

    tryWriteToFile() {
        let data = JSON.stringify(this.fakeData, null, 4)
        fs.writeFile(this.filePath, data, (err) => {
            if (err) console.log(err)
        })
    }

    getFilePath() {
        return this.filePath
    }
}

export { FakeDataGenerator as default }