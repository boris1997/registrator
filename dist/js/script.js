class Counter {
    constructor(buttons, amount) {
        this.buttons = buttons,
            this.amount = amount
    }
    changeAmount = () => {
        this.buttons[0].onclick = this.decreaseAmount
        this.buttons[1].onclick = this.increaseAmount
    }

    increaseAmount = () => {
        +this.amount.innerText++;
        +this.amount.innerText > 1 && (this.buttons[0].classList.contains('counter__button--disabled') && this.buttons[0].classList.remove('counter__button--disabled'))
    }

    decreaseAmount = () => {
        +this.amount.innerText > 1 && +this.amount.innerText--;
        +this.amount.innerText === 1 && this.buttons[0].classList.add('counter__button--disabled')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = [...document.querySelectorAll('.counter__button')];
    const amount = document.querySelector('.counter__amount');
    const counter = new Counter(buttons, amount)
    counter.changeAmount()
})
const footerYear = document.querySelector('.footer__year')

const getedYear = () => footerYear.textContent = `${new Date().getFullYear()}`


console.log(getedYear())
class Mail {
    constructor(btn, name, amount, phone) {
        this.btn = btn,
            this.name = name,
            this.amount = amount,
            this.phone = phone

    }

    сontactData = () => ({
        name: {
            value: this.name.value,
            item: this.name,
            re: /^[a-zA-Zа-яА-Я0-9]{2,16}$/
        },
        phone: {
            value: this.phone.value,
            item: this.phone,
            re: /^[78]{1}[9]{1}[0-9]{9}$/
        },
        amount: {
            value: +this.amount.textContent,
            item: this.amount,
            re: /^[1-9]{0,3}$/
        }
    })

    contactDataArray = () => Object.entries(this.сontactData())

    sendMail(param) {
        this.btn.addEventListener('click', (e) => {
            this.mailValidation(e)
        })
        document.addEventListener('keydown', (e) => {
            e.code === 'Enter' && this.mailValidation(e)
        })

    }

    mailValidation(e) {
        e.preventDefault()
        if (this.validateData()) {
            console.log('ok')
            this.contactDataArray().map(contactItem => contactItem[1].item.nextElementSibling.classList.contains('contact__invalid--show') && contactItem[1].item.nextElementSibling.classList.remove('contact__invalid--show'))


            let tempParams = {
                name: this.name.value,
                phone: this.phone.value,
                amount: +this.amount.textContent
            }

            this.makeRequest(this, tempParams)

            /*  emailjs.send('service_989hbji', 'template_ljjqzp6', tempParams).then(res => res) */
        }

    }

    makeRequest = (slider, tempParams) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.onload = function () {
            if (xhr.responseText === 'success') {
                const order = document.querySelector('.order');
                order.classList.add('modal--active');

                slider.removeFields()
            } else {
                console.log('some')
            }
        }
        xhr.send(JSON.stringify(tempParams))
    }

    removeFields = () => this.contactDataArray().map((contactItem, i) => contactItem[1].item.value = '')


    validateData = () => {
        return this.contactDataArray().every((contactItem, i) => contactItem[1].re.test(contactItem[1].value) ? true : this.setAlert(contactItem[1].item)) && true
    }

    setAlert(item) {
        item.nextElementSibling.classList.add('contact__invalid--show')
        setTimeout(() => {
            item.nextElementSibling.classList.remove('contact__invalid--show')
        }, 10000)
    }

}



document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.contact__button');
    const name = document.getElementById('name');
    const amount = document.querySelector('.counter__amount');
    const phone = document.getElementById('phone');
    const mail = new Mail(btn, name, amount, phone);
    mail.sendMail();
})


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


class Slider {

    constructor(arrow, content, sliderImg, main) {
        this.arrow = arrow,
            this.content = content,
            this.sliderImg = sliderImg,
            this.main = main,
            this.isDragging = false,
            this.settings = {
                'carousel': {
                    classes: [],
                    touchEvent: true,
                    slideAmounts: null,
                },
                'fade': {
                    classes: [],
                    touschEvent: false,
                    slideAmounts: 1,

                }
            }
        this.currentIndex = 0,
            this.startPos = 0,
            this.currentTranslation = 0;
        this.prevTranslation = 0;
        this.animationID = 0;
    }
    resizeWindow = () => {
        window.onresize = (e) => {
            console.log(window.getComputedStyle(this.main))
            this.getTransformation(e)
        }
    }

    contextMenu = () => {
        window.oncontextmenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false
        }
    }

    initDrag = () => {
        this.content.map((dragableItem, i) => {

            dragableItem.addEventListener('dragstart', (e) => e.preventDefault())

            //touch event
            dragableItem.addEventListener('touchstart', this.touchStart(i), { passive: true })
            dragableItem.addEventListener('touchend', (e) => this.touchEnd(e))
            dragableItem.addEventListener('touchmove', this.touchMove, { passive: true })


            //mouse event
            dragableItem.addEventListener('mousedown', this.touchStart(i), { passive: true })
            dragableItem.addEventListener('mouseup', (e) => this.touchEnd(e))
            dragableItem.addEventListener('mousemove', this.touchMove, { passive: true })
            console.log('ok');
            console.log(this)
            dragableItem.addEventListener('mouseleave', (e) => this.isDragging && this.touchEnd(e))


        })
    }

    touchStart = (i) => {
        /*         console.log(i) */
        return (event) => {
            this.content[i].classList.add('carousel__item--dragable');
            this.main.classList.remove('carousel__wrapper--smooth');
            this.sliderImg[i].classList.remove('carousel__img--zoom-out');
            this.currentIndex = i;
            this.startPos = this.getPositionX(event);
            this.isDragging = true;
            this.animationID = requestAnimationFrame(this.animation)
        }
    }

    touchEnd = (e) => {
        cancelAnimationFrame(this.animationID)
        this.isDragging = false;
        this.content[this.currentIndex].classList.remove('carousel__item--dragable');
        this.sliderImg[this.currentIndex].classList.add('carousel__img--zoom-out');
        this.main.classList.add('carousel__wrapper--smooth');
        const activeSlide = document.querySelector(".carousel__item--active");
        if (this.currentTranslation <= 0 && activeSlide.nextElementSibling && Math.abs(this.currentTranslation) > Math.abs(this.prevTranslation) + (activeSlide.clientWidth / 4.5)) {
            this.toggleAciveElement(activeSlide, activeSlide.nextElementSibling)
        } else if (this.currentTranslation <= 0 && activeSlide.previousElementSibling && Math.abs(this.currentTranslation) < Math.abs(this.prevTranslation) - (activeSlide.clientWidth / 4.5)) {
            this.toggleAciveElement(activeSlide, activeSlide.previousElementSibling)
        }
        this.getTransformation(e);

    }

    touchMove = (e) => {
        if (this.isDragging) {

            const currentPosition = this.getPositionX(e);
            if (this.currentTranslation <= 0 && this.currentTranslation >= (this.content[0].clientWidth * (this.content.length - 1)) * -1) {
                (this.currentTranslation = this.prevTranslation + currentPosition - this.startPos);
            }
        }
    }
    animation = () => {

        console.log(this.isDragging)
        if (this.isDragging) {
            this.setSliderPosition();
            requestAnimationFrame(this.animation)
        }
    }

    setSliderPosition = () => {
        console.log(this.main)
        this.main.style.transform = `translateX(${this.currentTranslation}px)`
    }


    getPositionX = (event) => event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;



    getToggleBtns = () => {
        this.arrow[0].addEventListener("click", (e) => {
            this.left(e);
        });

        this.arrow[1].addEventListener("click", (e) => {
            this.rigth(e);
        });
    }




    rigth = (e) => {
        const activeSlide = document.querySelector(".carousel__item--active");

        if (activeSlide.nextElementSibling) {
            this.toggleAciveElement(activeSlide, activeSlide.nextElementSibling)
            this.getTransformation(e)
        } else {
            this.toggleAciveElement(activeSlide, this.content[0])
            this.getTransformation(e)
        }

    }


    left = (e) => {
        const activeSlide = document.querySelector(".carousel__item--active");
        if (activeSlide.previousElementSibling) {

            this.toggleAciveElement(activeSlide, activeSlide.previousElementSibling)
            this.getTransformation(e)
        } else {
            this.toggleAciveElement(activeSlide, this.main.lastElementChild)
            this.getTransformation(e)
        }
    }

    toggleAciveElement = (active, unActive) => {
        active.classList.remove("carousel__item--active");
        unActive.classList.add("carousel__item--active");
    }

    activeSlide = () => document.querySelector(".carousel__item--active");

    getTransformation = (e) => {
        const activeSlide = document.querySelector(".carousel__item--active");
        this.currentIndex = this.content.indexOf(activeSlide);
        /*    this.slideNumber.textContent = this.currentIndex + 1; */
        this.prevTranslation = this.currentIndex * -activeSlide.clientWidth;
        this.currentTranslation = -this.currentIndex * activeSlide.clientWidth;
        if (e) {
            console.log('ok')
        }
        console.log(this.main)
        e ? this.main.style.transform = `translate(-${this.currentIndex}00%)` : (this.main.style.transform = `translate(${this.currentTranslation}px)`)
    }

}

class SliderVisibilty extends Slider {
    constructor(galleryImg, content, sliderImg, page, modal) {
        super()
        this.galleryImg = galleryImg,
            this.content = content,
            this.sliderImg = sliderImg,
            this.page = page,
            this.modal = modal
    }

    initGalleryImg = () => {
        this.galleryImg.map(galleryImage => galleryImage.onclick = (e) => this.showSlider(e, galleryImage))
    }


    initCloseBtn = () => {
        this.modal.map(item => item.onclick = (e) => { console.log(e); this.hideSlider(e, item) })
    }

    showSlider = (e, galleryImage) => {
        console.log(this)
        this.modal[0].classList.add('modal--active');
        this.sliderImg[this.galleryImg.indexOf(galleryImage)].classList.add('carousel__img--zoom-out')
        this.page.classList.add('page--no-scroll');
        const activeSlide = document.querySelector(".carousel__item--active");
        this.toggleAciveElement(activeSlide, this.content[this.galleryImg.indexOf(galleryImage)]);

    }

    hideSlider = (e, item) => {
        if ((this.startPos === e.clientX && e.target.classList.contains('carousel__img')) || e.target.classList.contains('button__close')) {
            item.classList.remove('modal--active');
            this.page.classList.contains('page--no-scroll') && this.page.classList.remove('page--no-scroll')
        }
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const arrow = [...document.querySelectorAll(".carousel__toggler")];
    const content = [...document.querySelectorAll(".carousel__item")];
    const sliderImg = [...document.querySelectorAll(".carousel__img")];
    const galleryImg = [...document.querySelectorAll(".gallery__img")];
    const page = document.querySelector(".page");
    const modal = [...document.querySelectorAll(".modal")];
    const main = document.querySelector(".carousel__wrapper");
    const slider = new Slider(arrow, content, sliderImg, main);
    const sliderVis = new SliderVisibilty(galleryImg, content, sliderImg, page, modal);
    /* slider.translateSlides(); */
    slider.getToggleBtns();
    slider.initDrag();
    // slider.contextMenu();
    sliderVis.initGalleryImg();
    sliderVis.initCloseBtn();

})


/* playProjectVideo = (video) => {
    video.map(item => {
        item.play();
        item.onended = () => item.play()
    })
}

const video = [...document.querySelectorAll('.video__gif')];
const vid = new Video

playProjectVideo(video) */