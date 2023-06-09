const toggleButtonState = (
    inputList,
    buttonElement,
    inactiveButtonClass,
    invalid
) => {
    if (hasInvalidInput(inputList) || invalid) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute("disabled", "");
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }
};

const setEventListeners = (
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass
) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    formElement.addEventListener("reset", function (e) {
        if (inputList.length) {
            toggleButtonState(
                inputList,
                buttonElement,
                inactiveButtonClass,
                true
            );
        }
    });
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const enableValidation = (options) => {
    const {
        formSelector,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
    } = options;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
    });
    formList.forEach((formElement) => {
        setEventListeners(
            formElement,
            inputSelector,
            submitButtonSelector,
            inactiveButtonClass
        );
    });
};

export { enableValidation };
