
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