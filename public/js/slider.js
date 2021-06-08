
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

