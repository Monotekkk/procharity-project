export default class FieldTextCleaner {
  constructor(fieldContainerElement) {
    this._containerElement = fieldContainerElement;

    this._btnElement = this._containerElement
      .querySelector('.btn');

    this._fieldElement = this._containerElement
      .querySelector(`.${this._containerElement.getAttribute('class')}__field`);

  }


  _clearInput(evt) {
    evt.preventDefault();

    if (this._fieldElement) {
      this._fieldElement.value = '';
    }
  }


  setEventListeners() {
    if (this._btnElement) {
      this._btnElement.addEventListener('mousedown', (evt) => {
        this._clearInput(evt)
      });
    }
  }
}