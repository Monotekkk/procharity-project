export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelectorAll(this._selector);
  }

  open(popup) {
    popup.classList.add('popup_opened');
  }

  close(popup) {
    popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popup.forEach(item=> {
      if (item) {
        this._closeButton = item.querySelector('.popup__btn-close');
        this._closeButton.addEventListener('click', () => {
          this.close(item)
        })
      }
    })
  }
}
