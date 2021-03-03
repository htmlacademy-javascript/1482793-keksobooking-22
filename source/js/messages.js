import {disableFilter} from './filter.js';
import {adForm} from './form.js';

const ALERT_SHOW_TIME = 5000;

const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const successTemplate = document.querySelector('#success').content.querySelector('.success');

const main = document.querySelector('main');

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

// Функция, создающая модальное окно
const createModal = (type) => {

  const onModalEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal(type);
    }
  };

  const closeModal = () => {
    type.remove();
    document.removeEventListener('keydown', onModalEscKeydown);
  };

  main.append(type);

  document.addEventListener('keydown', onModalEscKeydown);

  type.addEventListener('click', () => {
    closeModal(type);
  });
};

// Функция, показывающая окно с информацией об успешной отправке формы
const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  adForm.reset();
  createModal(successMessage);
};

// Функция, показывающая окно с информацией об ошибке при отправке формы
const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  createModal(errorMessage);
};

// Функция, показывающая предупреждение об ошибке запроса
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  disableFilter();

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert, showErrorMessage, showSuccessMessage};
