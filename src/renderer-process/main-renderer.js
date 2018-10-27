import TemplateManager from '../assets/template-manager'
import Settings from './settings'
import Timer from './timer'
import Charts from './charts'
import { Data } from '../assets/data'

export default class MainRenderer {
    constructor() {
        this.data = new Data()
        this.settings = new Settings(this)
        this.timer = new Timer(this)
        this.charts = new Charts(this)
        this.templateManager = new TemplateManager(this)
        
        this.data.tryLoadFromFile('data.json')
        this.settings.setDataFilePath('data.json')
    }
}

new MainRenderer()