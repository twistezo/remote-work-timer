import TemplateManager from '../assets/template-manager'
import Settings from './settings'
import Timer from './timer'
import { Data } from '../assets/data'

export default class MainRenderer {
    constructor() {
        this.settings = new Settings(this)
        this.data = new Data()
        this.data.loadFromFile()
        this.timer = new Timer(this)
        this.templateManager = new TemplateManager(this)
    }
    
    currentTabIsTimer() {
        return (this.templateManager.TabsEnum.TIMER == this.templateManager.activeTab)
    }
}

new MainRenderer()