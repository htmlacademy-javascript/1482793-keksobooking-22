import {showErrorMessage, showSuccessMessage} from './messages.js';
import {sendData} from './api.js';
import {INITIAL_COORDINATES, MAIN_PIN} from './map.js';
import {FILTER} from './filter.js';

const AD_FORM = document.querySelector('.ad-form');

const TITLE = AD_FORM.querySelector('#title');

const TYPE = AD_FORM.querySelector('#type');

const PRICE = AD_FORM.querySelector('#price');

const CHECK_IN_TIME = AD_FORM.querySelector('#timein');

const CHECK_OUT_TIME = AD_FORM.querySelector('#timeout');

const FIELDSETS = AD_FORM.querySelectorAll('fieldset');

const ADDRESS = AD_FORM.querySelector('#address');

const ROOM_NUMBER = AD_FORM.querySelector('#room_number');

const CAPACITY = AD_FORM.querySelector('#capacity');


const ACCOMODATION_PRICE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const disableForm = () => {
  AD_FORM.classList.add('ad-form--disabled');
  FIELDSETS.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const enableForm = () => {
  AD_FORM.classList.remove('ad-form--disabled');
  FIELDSETS.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

disableForm();

TITLE.addEventListener('invalid', () => {
  if (TITLE.validity.tooShort) {
    TITLE.setCustomValidity(`Минимальное количество символов: ${TITLE.minLength}`);
  } else if (TITLE.validity.tooLong) {
    TITLE.setCustomValidity(`Максимальное количество символов: ${TITLE.maxLength}`);
  } else if (TITLE.validity.valueMissing) {
    TITLE.setCustomValidity('Обязательное поле');
  } else {
    TITLE.setCustomValidity('');
  }
});

ADDRESS.readOnly = true;

TYPE.addEventListener('change', () => {
  const MIN_PRICE = ACCOMODATION_PRICE[TYPE.value];
  PRICE.min = MIN_PRICE;
  PRICE.placeholder = MIN_PRICE;
});

PRICE.addEventListener('invalid', () => {
  if (PRICE.validity.rangeUnderflow) {
    PRICE.setCustomValidity(`Минимальная цена: ${PRICE.min}`);
  } else if (PRICE.validity.tooLong) {
    TITLE.setCustomValidity(`Максимальная цена: ${PRICE.max}`);
  } else if (PRICE.validity.valueMissing) {
    PRICE.setCustomValidity('Обязательное поле');
  } else {
    PRICE.setCustomValidity('');
  }
});

const getRoomCapacity = () => {
  for (let option of CAPACITY.options) {
    option.disabled = !ROOMS_CAPACITY[ROOM_NUMBER.value].includes(option.value);
  }
  CAPACITY.value = ROOMS_CAPACITY[ROOM_NUMBER.value].includes(CAPACITY.value) ? CAPACITY.value : ROOMS_CAPACITY[ROOM_NUMBER.value][0];
};

getRoomCapacity();

ROOM_NUMBER.addEventListener('change', () => {
  getRoomCapacity();
});

CHECK_IN_TIME.addEventListener('change', () => {
  CHECK_OUT_TIME.value = CHECK_IN_TIME.value;
});

CHECK_OUT_TIME.addEventListener('change', () => {
  CHECK_IN_TIME.value = CHECK_OUT_TIME.value;
});

AD_FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    showSuccessMessage,
    showErrorMessage,
    new FormData(evt.target),
  );
});

AD_FORM.addEventListener('reset', () => {
  FILTER.reset();
  MAIN_PIN.setLatLng(INITIAL_COORDINATES);
  setTimeout(() => {
    getRoomCapacity();
    ADDRESS.value = `${INITIAL_COORDINATES.lat}, ${INITIAL_COORDINATES.lng}`;
  }, 0)
});

export {enableForm, ADDRESS, AD_FORM};
