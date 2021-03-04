import {showErrorMessage, showSuccessMessage} from './messages.js';
import {sendData} from './api.js';
import {initialCoordinates, mainPin} from './map.js';
import {filter} from './filter.js';
import {resetPhotoPreview} from './photos.js';

const adForm = document.querySelector('.ad-form');

const title = adForm.querySelector('#title');

const type = adForm.querySelector('#type');

const price = adForm.querySelector('#price');

const checkInTime = adForm.querySelector('#timein');

const checkOutTime = adForm.querySelector('#timeout');

const fieldsets = adForm.querySelectorAll('fieldset');

const address = adForm.querySelector('#address');

const roomNumber = adForm.querySelector('#room_number');

const capacity = adForm.querySelector('#capacity');


const accomodationPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const roomsCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

disableForm();

title.addEventListener('invalid', () => {
  if (title.validity.tooShort) {
    title.setCustomValidity(`Минимальное количество символов: ${title.minLength}`);
  } else if (title.validity.tooLong) {
    title.setCustomValidity(`Максимальное количество символов: ${title.maxLength}`);
  } else if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле');
  } else {
    title.setCustomValidity('');
  }
});

address.readOnly = true;

type.addEventListener('change', () => {
  const minPrice = accomodationPrice[type.value];
  price.min = minPrice;
  price.placeholder = minPrice;
});

price.addEventListener('invalid', () => {
  if (price.validity.rangeUnderflow) {
    price.setCustomValidity(`Минимальная цена: ${price.min}`);
  } else if (price.validity.tooLong) {
    title.setCustomValidity(`Максимальная цена: ${price.max}`);
  } else if (price.validity.valueMissing) {
    price.setCustomValidity('Обязательное поле');
  } else {
    price.setCustomValidity('');
  }
});

const getRoomCapacity = () => {
  for (let option of capacity.options) {
    option.disabled = !roomsCapacity[roomNumber.value].includes(option.value);
  }
  capacity.value = roomsCapacity[roomNumber.value].includes(capacity.value) ? capacity.value : roomsCapacity[roomNumber.value][0];
};

getRoomCapacity();

roomNumber.addEventListener('change', () => {
  getRoomCapacity();
});

checkInTime.addEventListener('change', () => {
  checkOutTime.value = checkInTime.value;
});

checkOutTime.addEventListener('change', () => {
  checkInTime.value = checkOutTime.value;
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    showSuccessMessage,
    showErrorMessage,
    new FormData(evt.target),
  );
});

adForm.addEventListener('reset', () => {
  filter.reset();
  mainPin.setLatLng(initialCoordinates);
  resetPhotoPreview();
  setTimeout(() => {
    getRoomCapacity();
    address.value = `${initialCoordinates.lat}, ${initialCoordinates.lng}`;
  }, 0)
});

export {enableForm, address, adForm};
