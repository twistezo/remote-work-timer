window.$ = window.jQuery = require('jquery')
window.Popper = require('popper.js')
window.Bootstrap = require('bootstrap')

import NavTabs from '../assets/tabs';

export default class MainRenderer {
    run() {
        const navTabs = new NavTabs;
        navTabs.init();
    }
}

new MainRenderer().run();