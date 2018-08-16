class  NavTabs {

    init() {
        let navTabs = document.querySelector('.nav-tabs');
         let navItems = navTabs.querySelectorAll('.nav-item');
        this.activeFirstNavItem(navItems);
        Array.prototype.forEach.call(navItems, (navItem) => {
            navItem.onclick = () => {
                navItem.classList.add('active', 'show');
                let activeNavItem = navItem.querySelector('.nav-link').getAttribute('href');
                this.unactiveRestOfNavItems(navItems, activeNavItem);
                console.log('active tab: ', activeNavItem);
            }
        })
    }

    unactiveRestOfNavItems(navItems, activeNavItem) {
        Array.prototype.forEach.call(navItems, (navItem) => {
            let currentNavItem = navItem.querySelector('.nav-link').getAttribute('href');
            if (currentNavItem != activeNavItem) {
                navItem.classList.remove('active', 'show');
            }
        })
    }

    activeFirstNavItem(navItems) {
        if (navItems.length > 0) {
            let firstNavItem = navItems[0];
            firstNavItem.classList.add('active', 'show');
        }
    }
}

export { NavTabs as default }