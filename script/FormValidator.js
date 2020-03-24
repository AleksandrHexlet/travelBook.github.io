class FormValidator {
  constructor (popup) {
    this.popup = popup;
  }
  //проверяем инпуты и добавляем сообщения
  checkInputValidity (input, errorMsg) {
    /* Можно лучше: удалите else а внутри условия добавьте return
		 например было: 
		 if(условие){  
			 // ваш код 
		 } else if(условие2){ 
			 // ваш код 
		 } 
		 стало : 
		 if(условие){  
				 // ваш код 
			return; 
		} 
	 
		 if(условие2){ 
			// ваш код 
			return; 
		} 
	 
	*/
    if (input.value.length === 0)
      errorMsg.textContent = 'Это обязательное поле';
    else if (input.getAttribute ('type') === 'url' && !input.validity.valid)
      errorMsg.textContent = 'Здесь должна быть ссылка';
    else if (!input.validity.valid)
      errorMsg.textContent = 'Должно быть от 2 до 30 символов';
    else errorMsg.textContent = '';
  }
  //Дизейблим или инейблим кнопку и плюс красим в черный цвет или убераем цвет.
  setSubmitButtonState (form, button) {
    if (form.checkValidity ()) {
      button.removeAttribute ('disabled');
      button.classList.add ('popup__button_change-color');
    } else {
      button.setAttribute ('disabled', '');
      button.classList.remove ('popup__button_change-color');
    }
  }
  setEventListeners () {
    const form = this.popup.querySelector ('.popup__form');
    const button = form.querySelector ('.popup__button');

    function checkValidity (event) {
      // Надо исправить: ненадо обращатьсяя к классу так, лучше так this.checkInputValidity()
      FormValidator.prototype.checkInputValidity (
        event.target,
        event.target.closest ('div').querySelector (`.popup__input-error`)
      );
      FormValidator.prototype.setSubmitButtonState (form, button);
    }
    form.addEventListener ('input', checkValidity);
    this.setSubmitButtonState (form, button);
  }
}
