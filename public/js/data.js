const footerYear = document.querySelector('.footer__year')

const getedYear = () => footerYear.textContent = `${new Date().getFullYear()}`


console.log(getedYear())