import {disableFilter} from './filter.js';
import {isEscEvent} from './util.js';
import {AD_FORM} from './form.js';

const ERROR_TEMPLATE = document.querySelector('#error').content.querySelector('.error');

const SUCCESS_TEMPLATE = document.querySelector('#success').content.querySelector('.success');

const ALERT_SHOW_TIME = 5000;

const MAIN = document.querySelector('main');

const onModalEscKeydown = (evt, modal) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal(modal);
  }
};

const closeModal = (modal) => {
  modal.remove();
  document.removeEventListener('keydown', onModalEscKeydown);
};

// Функция, создающая модальное окно
const createModal = (type) => {
  MAIN.append(type);

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal(type);
    }
  });

  document.addEventListener('click', () => {
    closeModal(type);
  });
};

// Функция, показывающая окно с информацией об успешной отправке формы
const showSuccessMessage = () => {
  const SUCCESS_MESSAGE = SUCCESS_TEMPLATE.cloneNode(true);
  AD_FORM.reset();
  createModal(SUCCESS_MESSAGE);
};

// Функция, показывающая окно с информацией об ошибке при отправке формы
const showErrorMessage = () => {
  const ERROR_MESSAGE = ERROR_TEMPLATE.cloneNode(true);
  createModal(ERROR_MESSAGE);
};

// Функция, показывающая предупреждение об ошибке запроса
const showAlert = (message) => {
  const ALERT_CONTAINER = document.createElement('div');
  ALERT_CONTAINER.style.zIndex = 100;
  ALERT_CONTAINER.style.position = 'absolute';
  ALERT_CONTAINER.style.left = 0;
  ALERT_CONTAINER.style.top = 0;
  ALERT_CONTAINER.style.right = 0;
  ALERT_CONTAINER.style.padding = '10px 3px';
  ALERT_CONTAINER.style.fontSize = '20px';
  ALERT_CONTAINER.style.textAlign = 'center';
  ALERT_CONTAINER.style.backgroundColor = 'red';

  ALERT_CONTAINER.textContent = message;

  document.body.append(ALERT_CONTAINER);

  disableFilter();

  setTimeout(() => {
    ALERT_CONTAINER.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlert, showErrorMessage, showSuccessMessage};
