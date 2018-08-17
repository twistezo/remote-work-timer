window.$ = window.jQuery = require('jquery')
window.Popper = require('popper.js')
window.Bootstrap = require('bootstrap')

import NavTabs from '../assets/tabs';
import TemplateSelector from '../assets/templates';

export default class MainRenderer {
    run() {
        new NavTabs(new TemplateSelector()).init();
    }
}

new MainRenderer().run();