// TODO: Clean up those Bootstrap imports.
window.$ = window.jQuery = require('jquery')
window.Popper = require('popper.js')
window.Bootstrap = require('bootstrap')

import NavTabs from '../assets/tabs';
import TemplateSelector from '../assets/templates';
import Settings from './settings';
import Timer from './timer';
import { Data } from '../assets/data';

export default class MainRenderer {
    constructor() {
        this.TabsEnum = Object.freeze({
            TIMER: '#timer',
            TABLE: '#table',
            SETTINGS: '#settings',
            ABOUT: '#about'
        });
        this.activeTab = '#timer';
        this.settings = new Settings(this);
        this.templateSelector = new TemplateSelector(this);
        this.navTabs = new NavTabs(this);
        this.timer = new Timer(this);
        this.data = new Data();
        this.triggerListeners();
    }

    triggerListeners() {
        if (this.TabsEnum.SETTINGS == this.activeTab) {
            this.settings.listen();
        } else if (this.TabsEnum.TIMER == this.activeTab) {
            this.timer.listenButtons();
            this.timer.renderTime();
        }
    }

    getTabsEnum() {
        return this.TabsEnum;
    }

    getActiveTab() {
        return this.activeTab;
    }

    setActiveTabByValue(givenValue) {
        for (const value of Object.values(this.TabsEnum)) {
            if (givenValue == value) {
                this.activeTab = value;
            }
        }
    }
}

new MainRenderer();