import fs from 'fs'

class FakeDataGenerator {
    constructor() {
        this.fakeData = null
    }

    generate() {
        let dateFrom = new Date()
        dateFrom.setMonth(dateFrom.getMonth() - 12)
        let dateTo = new Date()

        let fakeData = []
        for (let i = 0; i <= this.daysBetween(dateFrom, dateTo); i++) {
            let currentDay = this.addDays(dateFrom, i)
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

    tryWriteToFile() {
        let data = JSON.stringify(this.fakeData, null, 4)
        fs.writeFile('data.json', data, (err) => {
            if (err) console.log(err)
        })
    }
}

export { FakeDataGenerator as default }