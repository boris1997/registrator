class Sidebar {
    constructor(page, sections, menuItems, mobileMenuItems, hamburgerMenu, sidebar, sidebarBody, sidebarOverlay) {
        this.page = page,
            this.sections = sections,
            this.menuItems = menuItems,
            this.mobileMenuItems = mobileMenuItems,
            this.index = 0,
            this.sidebar = sidebar,
            this.hamburgerMenu = hamburgerMenu,
            this.sidebarBody = sidebarBody,
            this.sidebarOverlay = sidebarOverlay
    }
    sidebarManipulation = () => {

        console.log('ok')
        window.onresize = () => {
            (window.innerWidth > 1024 && this.sidebar.classList.contains('page__sidebar--active')) && this.removeSidebar()

        }
        this.sidebarOverlay.onclick = () => this.removeSidebar();
        this.hamburgerMenu.onclick = (e) => this.toggleSidebar();
        this.mobileMenuItems.map(item => item.onclick = () => this.removeSidebar())
    }



    toggleSidebar = () => {
        console.log('ok')
        this.sidebar.classList.toggle('page__sidebar--active');
        this.page.classList.toggle('page__noScroll');
        this.sidebarBody.classList.toggle('sidebar__body--active');
        this.sidebarOverlay.classList.toggle('overlay--show');
        this.hamburgerMenu.classList.toggle('hamburger-menu__content--active');
        /*      window.scrollTo({
                 top: 0,
                 behavior: "smooth"
             }) */
    }

    removeSidebar = () => {
        this.sidebar.classList.remove('page__sidebar--active');
        this.page.classList.remove('page__noScroll');
        this.sidebarBody.classList.remove('sidebar__body--active');
        this.sidebarOverlay.classList.remove('overlay--show');
        this.hamburgerMenu.classList.remove('hamburger-menu__content--active');
    }

    menuItemsInit = () => {
        this.menuItems.map((menuItem, i) => menuItem.onclick = () => { this.changeItemStyle(i) })
        /*   this.menuItems.map((menuItem, i) => menuItem.onmouseover = () => { this.hoverItemStyleOver(menuItem) })
          this.menuItems.map((menuItem, i) => menuItem.onmouseout = () => { this.hoverItemStyleOut(menuItem) }) */
    }

    changeItemStyle = (i) => {
        console.log('object')
        const activeMenuItem = document.querySelector('.menu__items--active');
        activeMenuItem.classList.remove('menu__items--active');
        this.menuItems[i].classList.add('menu__items--active');
        /* this.menuItems.map((menuItem, z) => i !== z && (console.log(z))) */
    }

    // hoverItemStyleOver = (menuItem) => {
    //     const activeMenuItem = document.querySelector('.menu__items--active');
    //     menuItem.style.backgroundColor = '#2a75d8';
    //     activeMenuItem.style.backgroundColor = '#000000';
    // }
    // hoverItemStyleOut = (menuItem) => {
    //     const activeMenuItem = document.querySelector('.menu__items--active');
    //     menuItem.style.backgroundColor = '#000000';
    //     activeMenuItem.style.backgroundColor = '#2a75d8'
    // }


    scrollEvent = () => {
        window.addEventListener('scroll', () => {
            this.setActiveUrl()
        })
    }

    setActiveUrl = () => {
        //проверяем больше ли отступ элемента чем текущий скрол, если нет проверяем следующий элемент
        if (this.sectionTop(1) - 150 < window.scrollY) {
            this.setNewUrl(this.index + 1);
            this.changeItemStyle(this.index + 1)
            this.index++;
        }

        if (this.sectionTop(0) - 150 > window.scrollY) {
            this.setNewUrl(this.index - 1);
            this.changeItemStyle(this.index - 1);
            this.index--;
        }
    }

    findActiveIndex = () => {
        for (let i = 0; i < this.sections.length; i++) {
            if (this.sections[i].getBoundingClientRect().top + window.pageYOffset < window.scrollY) {
                this.index = i;
                console.log(this.sections[i].getBoundingClientRect().top + window.pageYOffset)
                this.changeItemStyle(this.index)
                this.setNewUrl(this.index)
            } /* else if (this.sections[i].getBoundingClientRect().top + window.pageYOffset === 0) {
                console.log('ok')
                console.log(this.sections[i].getBoundingClientRect().top + window.pageYOffset)
                this.setNewUrl(this.index)
            } */
        }
    }

    setNewUrl = (i) => {
        console.log(i)
        const state = `#${this.sections[i].id}`;
        const title = 'scroll';
        const url = `#${this.sections[i].id}`
        history.replaceState(state, title, url)
    }

    sectionTop = (factor) => this.sections[this.index + factor].getBoundingClientRect().top + window.pageYOffset
}


document.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('.page');
    const sections = [...document.querySelectorAll('.section')];
    const menuItems = [...document.querySelectorAll('.menu__items')];
    const mobileMenuItems = [...document.querySelectorAll('.mobile-menu__item')];
    const pageSidebar = document.querySelector('.page__sidebar');
    const sidebarBody = document.querySelector('.sidebar__body');
    const sidebarOverlay = document.querySelector('.overlay');
    const hamburgerMenu = document.querySelector('.hamburger-menu__content');
    const sidebar = new Sidebar(page, sections, menuItems, mobileMenuItems, hamburgerMenu, pageSidebar, sidebarBody, sidebarOverlay);
    sidebar.findActiveIndex();
    sidebar.scrollEvent();
    sidebar.menuItemsInit();
    sidebar.sidebarManipulation()

})
