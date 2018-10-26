import zingchart from 'zingchart'

class Charts {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer
        this.importedData = []
    }

    listen() {
        const chartConfig = this.generateConfig()
        zingchart.loadModules('calendar', function () {
            zingchart.render({
                id: 'chart',
                data: chartConfig,
                height: 400,
                width: '100%'
            })
        })
    }

    importData(daysData) {
        let data = []
        daysData.forEach((dayDate) => {
            let dayDurationSum = 0
            dayDate.cyclesData.forEach((cycleData) => {
                dayDurationSum += cycleData.duration
            })
            dayDurationSum = dayDurationSum * 1 / 3600  // convert seconds to hoursF
            let dateString = dayDate.date.getFullYear() + '-' + (dayDate.date.getMonth() + 1)
                + '-' + dayDate.date.getDate()
            data.push([dateString, dayDurationSum])
        })
        this.importedData = data
    }

    startAndEndMonth() {
        const currentMonth = new Date().getMonth() + 1
        if (currentMonth <= 6) {
            return [1, 6]
        } else {
            return [1, 12]
        }
    }

    generateConfig() {
        return {
            type: 'calendar',
            options: {
                year: {
                    text: new Date().getFullYear().toString(),
                    visible: false
                },
                startMonth: this.startAndEndMonth()[0],
                endMonth: this.startAndEndMonth()[1],
                palette: ['none', '#2196F3'],
                month: {
                    item: {
                        fontColor: 'gray',
                        fontSize: 9
                    }
                },
                firstday: 'm',
                weekday: {
                    values: ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'],
                    item: {
                        fontColor: 'gray',
                        fontSize: 9
                    }
                },
                values: this.importedData
            },
            labels: [{ //Lefthand Label (container portion)
                borderColor: 'gray',
                borderWidth: 1,
                x: '8%',
                y: '60%',
                width: '40%',
                height: '30%'
            }, { //Lefthand Label (top portion)
                text: 'Daily Contribution',
                fontColor: '#212121',
                textAlign: 'center',
                x: '10%',
                y: '65%',
                width: '36%'
            }, { //Lefthand Label (middle portion)
                text: '%plot-value',
                fontColor: '#2196F3',
                fontFamily: 'Georgia',
                fontSize: 35,
                textAlign: 'center',
                x: '10%',
                y: '68%',
                width: '36%'
            },
            // Note: the bottom portion of the Bottom-Left Label is the fixed tooltip, below.

            { //Rightside Label (container portion)
                borderColor: 'gray',
                borderWidth: 1,
                x: '52%',
                y: '60%',
                width: '40%',
                height: '30%',
            }, { //Rightside Label (top portion)
                text: 'Total Contributions',
                fontColor: '#212121',
                textAlign: 'center',
                x: '54%',
                y: '65%',
                width: '36%'
            }, { //Rightside Label (middle portion)
                text: '1414',
                fontColor: '#2196F3',
                fontFamily: 'Georgia',
                fontSize: 35,
                textAlign: 'center',
                x: '54%',
                y: '68%',
                width: '36%'
            }, { //Rightside Label (bottom portion)
                text: 'Jan 1 - Jun 30',
                fontColor: '#212121',
                padding: 2,
                textAlign: 'center',
                x: '54%',
                y: '80%',
                width: '36%'
            }
            ],

            tooltip: { //Lefthand Label (bottom portion)
                text: '%data-day',
                backgroundColor: 'none',
                borderColor: 'none',
                fontColor: '#212121',
                padding: 2,
                //textAlign: 'center',
                align: 'center',
                sticky: true,
                timeout: 30000,
                x: '10%',
                y: '80%',
                width: '36%'
            },

            plotarea: {
                marginTop: '15%',
                marginBottom: '55%',
                marginLeft: '8%',
                marginRight: '8%'
            }
        }
    }
}

export { Charts as default }
