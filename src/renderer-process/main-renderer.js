import TemplateManager from '../assets/template-manager'
import Settings from './settings'
import Timer from './timer'
import Charts from './charts'
import { Data } from '../assets/data'

export default class MainRenderer {
    constructor() {
        this.settings = new Settings(this)
        this.charts = new Charts(this)
        this.data = new Data(this.charts, true)
        this.timer = new Timer(this)
        this.templateManager = new TemplateManager(this)
    }
}

new MainRenderer()