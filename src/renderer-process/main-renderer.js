import TemplateManager from '../assets/template-manager'
import Settings from './settings'
import Timer from './timer'
import { Data } from '../assets/data'

export default class MainRenderer {
    constructor() {
        this.settings = new Settings(this)
        this.data = new Data()
        this.data.tryLoadFromFile('data.json')
        this.timer = new Timer(this)
        this.templateManager = new TemplateManager(this)
    }
}

new MainRenderer()