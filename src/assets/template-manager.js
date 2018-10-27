class TemplateManager {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer
        this.TabsEnum = Object.freeze({
            TIMER: '#timer',
            CHARTS: '#charts',
            SETTINGS: '#settings',
            ABOUT: '#about'
        })
        this.activeTab = ''
        this.templatesEl = null
        this.templateContainerEl = null
        this.navTabsEl = null
        this.init()
    }

    // Main function for update active tab
    triggerListeners() {
        if (this.TabsEnum.TIMER == this.activeTab) {
            this.mainRenderer.timer.listen()
        } else if (this.TabsEnum.SETTINGS == this.activeTab) {
            this.mainRenderer.settings.listen()
        } else if (this.TabsEnum.CHARTS == this.activeTab) {
            this.mainRenderer.charts.listen()
        }
    }

    init() {
        this.templatesEl = this.collectHtmlTemplates()
        this.templateContainerEl = this.getTemplateContainerDiv()
        this.navTabsEl = this.collectNavTabsEl()
        this.activeFirstTabOnStart()
        this.listenTabs()
    }

    collectHtmlTemplates() {
        return document.querySelectorAll('link[rel="import"]')
    }

    getTemplateContainerDiv() {
        return document.querySelector('#template-container')
    }

    collectNavTabsEl() {
        return document.querySelectorAll('.nav-item')
    }

    activeFirstTabOnStart() {
        if (this.navTabsEl.length > 0) {
            let firstNavItem = this.navTabsEl[0]
            firstNavItem.classList.add('active', 'show')
            let firstNavItemId = firstNavItem.querySelector('.nav-link').getAttribute('href')
            this.renderTemplate(firstNavItemId)
        }
    }

    listenTabs() {
        Array.prototype.forEach.call(this.navTabsEl, (navItem) => {
            navItem.onclick = () => {
                navItem.classList.add('active', 'show')
                let activeNavItem = navItem.querySelector('.nav-link').getAttribute('href')
                this.unactiveOtherTabs(this.navTabsEl, activeNavItem)
                this.renderTemplate(activeNavItem)
            }
        })
    }

    unactiveOtherTabs(navItems, activeNavItem) {
        Array.prototype.forEach.call(navItems, (navItem) => {
            let currentNavItem = navItem.querySelector('.nav-link').getAttribute('href')
            if (currentNavItem != activeNavItem) {
                navItem.classList.remove('active', 'show')
            }
        })
    }

    renderTemplate(tabId) {
        this.setActiveTab(tabId)
        this.cleanTemplateContainer(this.templateContainerEl)

        Array.prototype.forEach.call(this.templatesEl, (link) => {
            let templateElement = link.import.querySelector('template')
            let currentTemplateId = templateElement.getAttribute('id') // returns '#name'
            if (currentTemplateId == this.activeTab) {
                let templateContentClone = document.importNode(templateElement.content, true)
                this.templateContainerEl.appendChild(templateContentClone)
            }
        })
        this.triggerListeners()
    }

    cleanTemplateContainer(element) {
        const parent = element
        while (parent.firstChild) {
            parent.firstChild.remove()
        }
    }

    // `tabId` looks like eg. `#timer`
    setActiveTab(tabId) {
        for (const enumValue of Object.values(this.TabsEnum)) {
            if (tabId == enumValue) {
                this.activeTab = enumValue
            }
        }
    }
}

export { TemplateManager as default }