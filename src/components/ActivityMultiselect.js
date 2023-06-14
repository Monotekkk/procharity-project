import {logPlugin} from "@babel/preset-env/lib/debug";

export default class CustomMultiselect {
  /**
   *
   * @param selector - слектор элемента select, который необходимо кастомизировать
   * @param options - объект параметров
   *    wrapClass                       - css-класс обертки (контейнера) кастомизированного поля
   *    headingClass                    - css-класс заголовка модального окна списка выбора (только для мобильной версии)
   *    closeBtnClass                   - css-класс кнопки закрытия модального окна (только для мобильной версии)
   *    fieldClass                      - css-класс поля выбора
   *    labelClass                      - css-класс элемента label
   *    chipsClass                      - css-класс элемента chips
   *    chipsTextClass                  - css-класс текстового контейнера внутри элемента chips
   *    chipsDeleteBtnClass             - css-класс кнопки удаления элемента chips
   *    searchInputClass                - css-класс текстового поля для поиска по списку
   *    messageContainerClass           - css-класс элемента списка, содержащего сообщение об отсутствии результатов поиска
   *    optionsListContainerClass       - css-класс контейнера выпадающего списка
   *    optionsOpenedListContainerClass - css-класс (модификатор) открытого контейнера
   *    linkClass                       - css-класс ссылок для выбора / сброса всех элементов группы (только для мобильной версии)
   *    selectAllGroupLinkClass         - css-класс ссылок для выбора всех элементов группы (только для мобильной версии)
   *    resetAllGroupLinkClass          - css-класс ссылок для сброса всех элементов группы (только для мобильной версии)
   *    selectBtnClass                  - css-класс кнопки подтверждения выбора элементов (только для мобильной версии)
   *    resetBtnClass                   - css-класс кнопки сброса всех элементов (только для мобильной версии)
   *    optionsListClass                - css-класс сипка элементов выбора
   *    optionClass                     - css-класс элемента выбора
   *    optionParentClass               - css-класс элемента списка, являющегося родительским
   *    optionParentOpenedClass         - css-класс элемента списка, являющегося родительским, имеющего раскрытый дочерний
   *                                    список (применяется для изменения вида стрелки в мобильной версии)
   *    optionSelectableClass           - css-класс элемента списка, доступного для выбора
   *    mobileScreenBreakpoint          - точка перелома для включения обработки списков, предназначенных для отображения
   *                                    на мобильных устройствах
   *    optionSelectedClass             - css-класс выбранного элемента списка
   *    firstOptionIsTitle              - если установлено в true - первый элемент списка будет
   *                                    использоваться в качестве подписи поля и не будет выводиться
   *                                    в кастомизированном списке
   *    useTextSearch                   - true | false - использовать / не использовать текстовый поиск по элементам списка
   */
  constructor(
    selector,
    options = {
      wrapClass: ['custom-select__wrap', 'custom-select__wrap_style_multiselect'],
      headingClass: ['heading', 'heading__title', 'custom-select__heading'],
      closeBtnClass: ['btn', 'btn_type_close', 'custom-select__btn-close'],
      fieldClass: ['custom-select__field', 'custom-select__field_style_multiselect'],
      labelClass: 'custom-select__label',
      chipsClass: 'custom-select__chips',
      chipsTextClass: 'custom-select__chips-text',
      chipsDeleteBtnClass: ['btn', 'custom-select__chips-delete-btn'],
      searchInputClass: 'custom-select__input',
      messageContainerClass: 'custom-select__message',
      modalClass: 'custom-select__modal',
      optionsListContainerClass: 'custom-select__list-container',
      optionsOpenedListContainerClass: 'custom-select__list-container__opened',
      linkClass: 'custom-select__link',
      selectAllGroupLinkClass: 'custom-select__link_type_select-all',
      resetAllGroupLinkClass: 'custom-select__link_type_reset',
      selectBtnClass: ['btn', 'btn_style_primary', 'custom-select__btn', 'custom-select__btn_type_select'],
      resetBtnClass: ['btn', 'btn_style_secondary', 'custom-select__btn', 'custom-select__btn_type_reset'],
      optionsListClass: ['custom-select__list', 'custom-select__list_type_multiselect', 'custom-select__list_activity'],
      optionClass: 'custom-select__item',
      optionParentClass: 'custom-select__item_style_parent',
      optionParentOpenedClass: 'custom-select__item_style_parent-opened',
      optionSelectableClass: 'custom-select__item_style_checkbox',
      optionSelectedClass: 'custom-select__item_selected-checkbox',
      mobileScreenBreakpoint: 900,
      firstOptionIsTitle: false,
      useTextSearch: false
  }) {
    this._selectElement = document.querySelector(selector);
    this._options = options;

    this._handleSearch = this._handleSearch.bind(this);
  }


  _changeOption(option) {
    if (this._selectElement.multiple) {
      const element = this._selectElement.querySelector(`[value="${option.dataset.val}"]`);

      element.selected = !element.selected
    } else {
      this._selectElement.value = option.dataset.val;
    }
  }


  _createWrap() {
    // Создание обертки для кастомного селекта
    // Обертка позволит позиционировать раскрывающийся список относительно поля выбора
    const element = document.createElement('div');
    element.classList.add(
      ...this._handleClassList(this._options.wrapClass)
    );

    return element;
  }

  _createCloseBtn() {
    const element = document.createElement('button');
    element.classList.add(
      ...this._handleClassList(this._options.closeBtnClass)
    );

    return element;
  }


  _createField() {
    // Создание поля кастомного селекта
    const element = document.createElement('div');
    element.classList.add(
      ...this._handleClassList(this._options.fieldClass)
    );

    return element;
  }


  _createLabel() {
    // Создание подписи к полю
    const element = document.createElement('span');
    element.classList.add(
      ...this._handleClassList(this._options.labelClass)
    );
    
    element.textContent = ("Виды деятельности:" + " 0 из 13");
    
    return element;
  }


  _createListContainer() {
    const element = document.createElement('div');
    element.classList.add(
      ...this._handleClassList(this._options.optionsListContainerClass)
    );

    return element;
  }


  _createSelectResetGroupLink() {
    const element = document.createElement('a');
    element.textContent = 'Сбросить';
    element.classList.add(
      ...this._handleClassList([this._options.linkClass, this._options.resetAllGroupLinkClass])
    );

    return element;
  }


  _createSelectAllLink() {
    const element = document.createElement('a');
    element.textContent = 'Выбрать все';
    element.classList.add(
      ...this._handleClassList([this._options.linkClass, this._options.selectAllGroupLinkClass])
    );

    return element;
  }


  _createList() {
    const element = document.createElement('ul');
    element.classList.add(
      ...this._handleClassList(this._options.optionsListClass)
    );

    return element;
  }


  _createMessageContainer() {
    const element = document.createElement('div');
    element.classList.add(
      ...this._handleClassList(this._options.messageContainerClass)
    );

    element.textContent = 'Ничего не найдено';

    return element;
  }


  _createItem() {
    const element = document.createElement('li');
    element.classList.add(
      ...this._handleClassList(this._options.optionClass)
    );

    return element;
  }


  _createSearchInput() {
    const element = document.createElement('input');
    element.classList.add(
      ...this._handleClassList(this._options.searchInputClass)
    );

    return element;
  }


  _createSelectBtn() {
    const element = document.createElement('button');
    element.classList.add(
      ...this._handleClassList(this._options.selectBtnClass)
    );
    element.textContent = 'Выбрать';

    return element;
  }


  _createResetBtn() {
    const element = document.createElement('button');
    element.classList.add(
      ...this._handleClassList(this._options.resetBtnClass)
    );
    element.textContent = 'Сбросить выбор';

    return element;
  }
  

  //Multi
  _createDropdownBlock() {
    // Создание обертки для кастомного селекта
    this._customSelectElement = this._createWrap();

    // Кнопка закрытия выпадающего списка
    this._closeBtnElement = this._createCloseBtn();

    // Создание поля кастомного селекта
    this._fieldElement = this._createField();

    // Создание подписи поля
    this._labelElement = this._createLabel();
    if (this._options.firstOptionIsTitle) {
      this._labelElement.textContent = this._selectElement
        .querySelector('option').textContent;
    }

    // Создание текстового поля для поиска элементов списка
    if (this._options.useTextSearch) {
      this._searchInputElement = this._createSearchInput();

      this._fieldElement.append(this._searchInputElement);
    }

    // Добавление текстового элемента и иконки к полю
    this._fieldElement.append(this._labelElement);

    // Добавление поля в контейнер
    this._customSelectElement.append(this._fieldElement);

    // Создание контейнера для вариантов выбора
    this._optionsListContainerElement = this._createListContainer();

    // Создание элемента списка вариантов выбора
    this._optionsListElement = this._createList();

    // Создание контейнера для хранения сообщения об отсутствии результатов поиска
    this._messageContainerElement = this._createMessageContainer();


    // Добавление контейнера с сообщением об отсутствии результатов поиска
    // в элемент списка с вариантами выбора
    this._optionsListElement.append(this._messageContainerElement);


    // Создание кнопки подтверждения выбора
    this._selectBtnElement = this._createSelectBtn();

    // Создание кнопки сброса выбора
    this._resetBtnElement = this._createResetBtn();


    this._optionsListContainerElement.append(
      this._closeBtnElement,
      this._optionsListElement,
      this._selectBtnElement,
      this._resetBtnElement
    );

    this._optionsListContainerElement.classList.add(
      this._options.modalClass
    )

    // Добавление контейнера списка в контейнер поля
    this._customSelectElement.append(this._optionsListContainerElement);
  }


  _getOptions() {
    this._data = [];

    // Рекурсивная функция для прохода по всем уровням вложенности элементов
    function createDataArray(array) {
      //Результирующий массив
      const resultArray = [];

      array.forEach((item, index) => {
        // Обрабатываются только элементы optgroup и option,
        // в противном случае в результирующий массив попадут
        // текстовые узлы
        if (item.tagName === 'OPTGROUP'
          || item.tagName === 'OPTION') {

          // Объект с параметрами варианта выбора
          resultArray.push({
            tagName: item.tagName.toLocaleLowerCase(),
            value: item.value || null,
            text: item.label || item.textContent,
            id: item.id,
            children: createDataArray(item.childNodes),
            isSelected: item.hasAttribute('selected'),
            isSelectable: item.tagName === 'OPTION'
          });
        }
      })

      return resultArray;
    }

    const optgroups = this._selectElement.querySelectorAll('optgroup');
    const options = this._selectElement.querySelectorAll('option');

    // Если удалось найти внутри элемента select элементы optgroup
    if (optgroups && optgroups.length > 0) {
      //Передаем их в фукцию для рекурсивного получения данных
      return createDataArray(optgroups);
    }

    return createDataArray(options);
  }


  //Multi
  _handleItemClick(evt) {
    // Переключение класса "выбранного" (отмеченного) элемента
    this._toggleSelectedOption(evt.target);

    // Изменение выбранных элементов в стандартном select
    this._changeOption(evt.target);
  }


  //Multi
  _handleParentItemClick(evt) {
    console.log(window.innerWidth, this._options.mobileScreenBreakpoint, window.outerWidth < this._options.mobileScreenBreakpoint)

    if (window.innerWidth < this._options.mobileScreenBreakpoint) {
      evt.target.classList.toggle(this._options.optionParentOpenedClass);

      const childContainer = evt.target.querySelector(`.${this._options.optionsListContainerClass}`);

      if (childContainer) {
        childContainer.classList.toggle(this._options.optionsOpenedListContainerClass);
      }
    }
  }


  _handleSearch() {
    // Открываем выпадающий список (на случай, если он был закрыт)
    // при вводе текста в поле всегда будут видны результаты
    this.openDropdown();

    // Счетчик найденных результатов
    let resultCounter = 0;

    // Скрываем все родительские пункты списка
    this._optionsListElement.querySelectorAll(`.${this._options.optionParentClass}`)
      .forEach((parentItem) => {
      parentItem.style.display = 'none';
    })

    // Поиск всех элементов списка среди элементов, доступных для выбора
    this._optionsListElement.querySelectorAll(`.${this._options.optionClass}[data-is-selectable="true"]`)
      .forEach((item) => {
        // Если текстовое содержимое элемента содержит поисковый запрос
        if (item.textContent.toLowerCase()
          .includes(this._searchInputElement.value.toLowerCase())) {
          // Делаем данный элемент видимым
          item.style.display = 'list-item';

          // Находим родительский пункт списка и делаем его видимым
          item.closest(`.${this._options.optionParentClass}`).style.display = 'list-item';

          resultCounter += 1;
        } else {
          // Скрываем остальные элементы, несоответствующие поисковому запросу
          item.style.display = 'none';
        }

        // Если не найдено ни одного совпадения по поисковому запросу
        if (resultCounter === 0) {
          // Выводим сообщение об отсутствии результатов поиска
          this._messageContainerElement.style.display = 'block';
        } else {
          this._messageContainerElement.style.display = 'none';
        }
      })
  }


  //Multi
  _handleSelectGroup(evt) {
    const container = evt.target.parentNode;
    const options = container.querySelectorAll(`.${this._options.optionClass}`);

    options.forEach((option) => {
      const chips = this._fieldElement
        .querySelector(`[data-val="${option.dataset.val}"]`);

      this._setSelectedOption(option);
      this._changeOption(option);
    })
  }


  //Multi
  _handleResetGroup(evt) {
    const container = (evt) ? evt.target.parentNode : this._customSelectElement;
    const options = container.querySelectorAll(`.${this._options.optionSelectedClass}`);

    options.forEach((option) => {
      this._resetSelectedOption(option);
      this._changeOption(option);
    })
  }


  _handleClassList(classList) {
    if (typeof classList === 'string') {
      return [classList];
    }
    return classList;
  }


  _createItems(data, parentElement) {
    data.forEach((item, index) => {
      // Создание элемента списка li
      const option = this._createItem();

      // Добавление атрибута для связки элементов выбора со стандартным select
      option.setAttribute('data-val', item.value);
      option.setAttribute('data-is-selectable', item.isSelectable);

      if (item.isSelectable) {
        option.classList.add(
          this._handleClassList(this._options.optionSelectableClass)
        );
      }


      // Установка отображаемого текстового значения
      option.textContent = item.text;

      // Если имеются дочерние элементы
      if (item.children.length > 0) {
        // Добавляем стиль родительского пункта списка (стрелка)
        option.classList.add(
          ...this._handleClassList(this._options.optionParentClass)
        );

        //Создание контейнера (обертки) дочернего списка
        const container = this._createListContainer();
        container.append(this._createSelectResetGroupLink());
        container.append(this._createSelectAllLink());

        // Создание элемента дочернего списка
        const list = this._createList();

        // Рекурсивный вызов
        this._createItems(item.children, list);
        container.append(list)
        option.append(container);
      }
      parentElement.append(option);
    });
  }
  
  
  _toggleSelectedOption(option) {
    // Стилизация выбранного элемента списка
    option.classList.toggle(this._options.optionSelectedClass);
  }


  _setSelectedOption(option) {
    option.classList.add(this._options.optionSelectedClass);
  }


  _resetSelectedOption(option) {
    option.classList.remove(this._options.optionSelectedClass);
  }


  //Multi
  generate() {
    if (this._selectElement) {
      // Создание каркаса кастомного селекта
      this._createDropdownBlock();
      this._selectElement.after(this._customSelectElement);


      // Заполнение каркаса элементами списка
      this._createItems(
        this._getOptions(),
        this._optionsListElement
      );

      //Установка обработчиков событий
      this.setEventListeners();
    }
  }


  _closeOtherItems() {
    // Поиск открытого дочернего контейнера с элементами следующего уровня
    const openedChildContainer = this._optionsListContainerElement
      .querySelector(`.${this._options.optionsOpenedListContainerClass}`);

    // Если открытый контейнер найден
    if (openedChildContainer) {
      // Удаление класса "открытого" контейнера
      openedChildContainer.classList.remove(this._options.optionsOpenedListContainerClass);
    }


    // Поиск пункта списка, являющегося родительским для открытого контейнера
    const openedParentItem = this._optionsListContainerElement
      .querySelector(`.${this._options.optionParentOpenedClass}`);

    // Если открытый контейнер найден
    if (openedParentItem) {
      // Удаление класса "открытого" контейнера
      openedParentItem.classList.remove(this._options.optionParentOpenedClass);
    }
  }


  closeDropdown() {
    this._optionsListContainerElement.classList
      .remove(this._options.optionsOpenedListContainerClass);

    // Удаляем все классы-модификаторы открытых дочерних списков
    // (необходимо для корректного расположения дочерних списков при повторном открытии)
    this._optionsListContainerElement
      .querySelectorAll(`.${this._options.optionsOpenedListContainerClass}`)
      .forEach((option) => {
        option.classList.remove(this._options.optionsOpenedListContainerClass);
      })
  }


  openDropdown() {
    this._optionsListContainerElement.classList
      .add(this._options.optionsOpenedListContainerClass);
  }

  setEventListeners() {
    // Обработка текстового поиска по списку
    if (this._options.useTextSearch) {
      this._searchInputElement.addEventListener('input', this._handleSearch);
    }

    // Обработка клика вне выпадающего списка
    document.addEventListener('mousedown', (evt) => {
      // Если клик был совершен за пределами контейнера
      if (!evt.target.closest(`.${this._options.wrapClass}`)) {
        // Закрытие выпадающего списка
        this.closeDropdown();
      }
    });

    this._resetBtnElement.addEventListener('mousedown', (evt) => {
      this._handleResetGroup();
    })

    // Обработка клика по контейнеру выпадающего списка
    this._customSelectElement.addEventListener('mousedown', (evt) => {

      // Если клик по ссылке "Выбрать все"
      if (evt.target.classList.contains(this._options.selectAllGroupLinkClass)) {
        this._handleSelectGroup(evt);        
      }


      // Если клик по ссылке "Сбросить"
      if (evt.target.classList.contains(this._options.resetAllGroupLinkClass)) {
        this._handleResetGroup(evt);
        labelElem.textContent = ("Выбрано видов деятельности: 0 из 13");
      }

      // Если клик был совершен по пункту выпадающего списка
      if (evt.target.classList.contains(this._options.optionClass)) {
        // Если пункт доступен для обработки клика (на случай, если в списке будут
        // присутствовать элементы optgroup, не имеющие вложенных элементов option
        // В этом случае клик по пункту никак обработан не будет
        if (evt.target.dataset.isSelectable === 'true') {
          // Обработка клика по элементу
          this._handleItemClick(evt);

          const select = document.querySelector('#activities')
          let selected = Array.from(select.options).filter(option => option.selected).map(option => option.value);
          const selectedCheckboxs = selected.length
          const labelElem = document.querySelector('.custom-select__label');
          labelElem.textContent = ("Выбрано видов деятельности: " + selectedCheckboxs + " из 13");
       

          // Если используется текстовый поиск по списку
          if (this._options.useTextSearch) {
            // После выбора элемента возвращаем фокус на поле
            this._searchInputElement.focus();
          }
        // Если клик был произведен по элементу списка, который не доступен для
        // выбора - значит это родительский пункт, при нажатии на который
        // следует раскрыть дочерний список кликабельных элементов
        } else {
          // Перед открытием вложенного списка скрываются все ранее открытые элементы
          this._closeOtherItems();
          console.log('parent')
          this._handleParentItemClick(evt);
        }


        // В остальных случаях
      } else {
        // Если контейнер выпадающего списка открыт
        // и клик был совершен за пределами дочерних элеменетов пункта списка
        if (this._optionsListContainerElement.classList
            .contains(this._options.optionsOpenedListContainerClass)
          && !evt.target.closest(`.${this._options.optionClass}`)) {
          // Закрытие выпадающего списка
          this.closeDropdown();

        } else {
          // или открываем
          this.openDropdown();
        }
      }
    });
  }
}