navTabsBehaviour();

function navTabsBehaviour() {
    let navTabs = document.querySelector('.nav-tabs');
    let navItems = navTabs.querySelectorAll('.nav-item');
    activeFirstNavItem(navItems);
    Array.prototype.forEach.call(navItems, (navItem) => {
        navItem.onclick = () => {
            navItem.classList.add('active', 'show');
            let activeNavItem = navItem.querySelector('.nav-link').getAttribute('href');
            unactiveRestOfNavItems(navItems, activeNavItem);
            console.log('active tab: ', activeNavItem);
        }
    })
}

function unactiveRestOfNavItems(navItems, activeNavItem) {
    Array.prototype.forEach.call(navItems, (navItem) => {
        let currentNavItem = navItem.querySelector('.nav-link').getAttribute('href');
        if (currentNavItem != activeNavItem) {
            navItem.classList.remove('active', 'show');
        }
    })
}

function activeFirstNavItem(navItems) {
    if (navItems.length > 0) {
        let firstNavItem = navItems[0];
        firstNavItem.classList.add('active', 'show');
    }
}