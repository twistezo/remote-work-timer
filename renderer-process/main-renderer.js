window.$ = window.jQuery = require('jquery')
window.Popper = require('popper.js')
window.Bootstrap = require('bootstrap')

import NavTabs from '../assets/tabs';
import TemplateSelector from '../assets/templates';
import Settings from './settings';
import Timer from './timer';

export default class MainRenderer {
    constructor() {
        this.settings = null;
        this.ActiveTabEnum = Object.freeze({
            TIMER: '#timer',
            TABLE: '#table',
            SETTINGS: '#settings',
            ABOUT: '#about'
        });
        this.activeTab = null;
    }

    run() {
        const templateSelector = new TemplateSelector();
        new NavTabs().withTemplateSelector(templateSelector).init();
        this.settings = new Settings();

        const activeTab = this.ActiveTab;
        console.log(activeTab);

        new Timer(this.settings).init();
    }

    teste(ObjEnum) {
        for (const key of Object.keys(ObjEnum)) {
            console.log(key, ObjEnum[key]);
            if (key == ObjEnum) {
                true
            }

        }
    }
}

new MainRenderer().run();