class TemplateSelector {
    constructor(MainRenderer) {
        this.mainRenderer = MainRenderer;
        this.templates = document.querySelectorAll('link[rel="import"]');
        this.templateContainerElement = document.querySelector('#template-container');
        this.activeFirstTemplateOnStart(this.templates, this.templateContainerElement);
    }

    renderTemplate() {
        this.cleanTemplateContainer(this.templateContainerElement);

        Array.prototype.forEach.call(this.templates, (link) => {
            let templateElement = link.import.querySelector('template');
            let currentTemplateId = templateElement.getAttribute('id'); // returns '#name'
            let activeTab = this.mainRenderer.getActiveTab(currentTemplateId);
            if (currentTemplateId == activeTab) {
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

    activeFirstTemplateOnStart(templates, templateContainer) {
        if (templates.length > 0) {
            let firstTemplate = templates[0].import.querySelector('template');
            let templateContentClone = document.importNode(firstTemplate.content, true)
            templateContainer.appendChild(templateContentClone);
        }
    }
}

export { TemplateSelector as default }