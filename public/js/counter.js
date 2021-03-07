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