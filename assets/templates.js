class TemplateSelector {
    constructor() {
        this.activeTab = null;
        this.templates = document.querySelectorAll('link[rel="import"]');
        this.templateContainerElement = document.querySelector('#template-container');
        this.activeFirstTemplateOnStart(this.templates, this.templateContainerElement);
    }

    renderTemplate() {
        this.cleanTemplateContainer(this.templateContainerElement);

        Array.prototype.forEach.call(this.templates, (link) => {
            let templateElement = link.import.querySelector('template');
            if (templateElement.getAttribute('id') == this.activeTab) {
                let templateContentClone = document.importNode(templateElement.content, true)
                this.templateContainerElement.appendChild(templateContentClone);
            }
        })
    }

    cleanTemplateContainer(element) {
        const parent = element;
        while (parent.firstChild) {
            parent.firstChild.remove();
        }
    }

    getActiveTab() {
        return this.activeTab;
    }

    setActiveTab(value) {
        this.activeTab = value;
    }

    activeFirstTemplateOnStart(templates, templateContainer) {
        if (templates.length > 0) {
            let firstTemplate = templates[0].import.querySelector('template');
            let templateContentClone = document.importNode(firstTemplate.content, true)
            templateContainer.appendChild(templateContentClone);
        }
    }
}

export { TemplateSelector as default }