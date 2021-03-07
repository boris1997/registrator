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
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.onload = function () {
                console.log('oj')
                alert('success')
                if (xhr.responseText === 'success') {
                    alert('success')
                } else {
                    console.log('some')
                }
            }
            xhr.send(JSON.stringify(tempParams))
            /*  emailjs.send('service_989hbji', 'template_ljjqzp6', tempParams).then(res => res) */
        }

    }


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


class Scroll {
    constructor(page, sections, menuItems, hamburgerMenu, sidebar, sidebarBody, sidebarOverlay) {
        this.page = page,
            this.sections = sections,
            this.menuItems = menuItems,
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
    const sidebar = document.querySelector('.page__sidebar');
    const sidebarBody = document.querySelector('.sidebar__body');
    const sidebarOverlay = document.querySelector('.overlay');
    const hamburgerMenu = document.querySelector('.hamburger-menu__content');
    const scroll = new Scroll(page, sections, menuItems, hamburgerMenu, sidebar, sidebarBody, sidebarOverlay);
    scroll.findActiveIndex();
    scroll.scrollEvent();
    scroll.menuItemsInit();
    scroll.sidebarManipulation()

})


class Slider {

    constructor(arrow, content, galleryImg, sliderImg, main, page, closeBtn, sliderCarousel, btn) {
        this.arrow = arrow,
            this.content = content,
            this.galleryImg = galleryImg,
            this.sliderImg = sliderImg,
            this.main = main,
            this.page = page,
            this.closeBtn = closeBtn,
            this.sliderCarousel = sliderCarousel,
            this.btn = btn
    }

    translateSlides = () => {
        for (let i = 1; i < content.length; i++) {
            this.translate();
        }
        window.addEventListener("resize", () => {
            this.translate();
        });

    }
    translate = () => {
        for (let i = 1; i < content.length; i++) {
            content[i].style.left = content[i].clientWidth * i + "px";
            console.log(i);
            console.log(content[i].clientWidth);
        }
    }

    getToggleBtns = () => {
        /* inter = setInterval(this.rigth, 6000); */
        this.arrow[0].addEventListener("click", () => {
            this.left();
            /*  clearInterval(inter); */
        });

        this.arrow[1].addEventListener("click", () => {
            this.rigth();
            /*   clearInterval(inter); */

        });
    }

    initGalleryImg = () => {
        this.galleryImg.map(galleryImage => galleryImage.onclick = (e) => this.showSlider(e, galleryImage))
    }

    initSliderImg = () => {
        this.sliderImg.map(sliderImage => sliderImage.onclick = (e) => this.hideSlider())
    }

    initCloseBtn = () => {
        this.closeBtn.onclick = (e) => this.hideSlider()
    }

    showSlider = (e, galleryImage) => {
        this.sliderCarousel.classList.add('modal--active');
        this.page.classList.add('page--no-scroll');
        this.getTransformation(galleryImage);
        const activeSlide = document.querySelector(".slider__item--active");
        activeSlide.classList.remove('slider__item--active');
        console.log(this.content[this.galleryImg.indexOf(galleryImage)])
        this.content[this.galleryImg.indexOf(galleryImage)].classList.add('slider__item--active');
    }

    hideSlider = () => {
        const modalActive = document.querySelector('.modal--active');
        this.page.classList.remove('page--no-scroll');
        modalActive.classList.remove('modal--active');
    }

    showNeededSLide = () => {
        this.content.forEach(el => {
            if (content.indexOf(el) === toggleBtn.indexOf(this)) {
                clearInterval(inter);
                main.style.transform = 'translate(-' + content.indexOf(el) + '00%)'
            }
        })
        toggleBtn.forEach(item => {
            if (toggleBtn.indexOf(item) === toggleBtn.indexOf(this)) {
                item.classList.add('active-toggle')
            } else {
                item.classList.remove('active-toggle')

            }
        })
    }


    rigth = () => {
        /* if (slider.classList.contains('show')) {
                slider.classList.remove('show')
                slider.nextElementSibling.classList.add('show')
            } */

        const activeSlide = document.querySelector(".slider__item--active");

        if (activeSlide.nextElementSibling) {
            activeSlide.classList.remove("slider__item--active");
            activeSlide.nextElementSibling.classList.add("slider__item--active");
            this.main.style.transform += "translate(-100%)";

            console.log(activeSlide);
        } else {
            activeSlide.classList.remove("slider__item--active");
            this.content[0].classList.add("slider__item--active");
            this.main.style.transform = "translate(0)";
        }

    }


    left = () => {
        const activeSlide = document.querySelector(".slider__item--active");
        if (activeSlide.previousElementSibling) {
            activeSlide.classList.remove("slider__item--active");
            activeSlide.previousElementSibling.classList.add("slider__item--active");
            this.main.style.transform += "translate(100%)";
        } else {
            activeSlide.classList.remove("slider__item--active");
            this.main.lastElementChild.classList.add("slider__item--active");
            this.main.style.transform = "translate(-300%)";
        }
        console.log(activeSlide);
    }

    getTransformation = (activeSlide) => {
        console.log(activeSlide)
        console.log(this.content.indexOf(activeSlide))
        this.main.style.transform = 'translate(-' + this.galleryImg.indexOf(activeSlide) + '00%)'
    }
    /*   checkClass(item) {
          content.forEach(el => {
              if (el.classList.contains('slider__item--active')) {
                  console.log(el)
                  item.style.background = '#2b2b2b'
              } else {
                  item.style.background = 'none'
              }
          })
      } */
}



document.addEventListener('DOMContentLoaded', () => {
    const arrow = [...document.querySelectorAll(".slider__arrow")];
    const content = [...document.querySelectorAll(".slider__item")];
    const sliderImg = [...document.querySelectorAll(".slider__img")];
    const galleryImg = [...document.querySelectorAll(".gallery__img")];
    const page = document.querySelector(".page");
    const closeBtn = document.querySelector(".button__close");
    const sliderCarousel = document.querySelector(".slider");
    const main = document.querySelector(".slider__wrapper");
    const btn = document.querySelectorAll(".btn");
    const slider = new Slider(arrow, content, galleryImg, sliderImg, main, page, closeBtn, sliderCarousel, btn);
    /* slider.translateSlides(); */
    slider.getToggleBtns();
    slider.initGalleryImg();
    slider.initSliderImg();
    slider.initCloseBtn();

})