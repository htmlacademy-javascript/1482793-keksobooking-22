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

const submitButton = adForm.querySelector('.ad-form__submit');


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

const setPrice = () => {
  const minPrice = accomodationPrice[type.value];
  price.min = minPrice;
  price.placeholder = minPrice;
};

disableForm();

title.addEventListener('input', () => {
  if (title.validity.tooShort) {
    title.setCustomValidity(`Минимальное количество символов: ${title.minLength}`);
  } else if (title.validity.tooLong) {
    title.setCustomValidity(`Максимальное количество символов: ${title.maxLength}`);
  } else if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле');
  } else {
    title.setCustomValidity('');
    title.classList.remove('invalid-input');
  }

  title.reportValidity();
});

address.readOnly = true;

type.addEventListener('change', () => {
  setPrice();
});

price.addEventListener('input', () => {
  if (price.validity.rangeUnderflow) {
    price.setCustomValidity(`Минимальная цена: ${price.min}`);
  } else if (price.validity.rangeOverflow) {
    price.setCustomValidity(`Максимальная цена: ${price.max}`);
  } else if (price.validity.valueMissing) {
    price.setCustomValidity('Обязательное поле');
  } else {
    price.setCustomValidity('');
    price.classList.remove('invalid-input');
  }

  price.reportValidity();
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

const showInvalidFieldsBorders = () => {
  const invalidFields = adForm.querySelectorAll('input:invalid');
  invalidFields.forEach((field) => field.classList.add('invalid-input'));
}

const removeInvalidFieldsBorders = () => {
  const fieldsWithBorders = adForm.querySelectorAll('.invalid-input');
  fieldsWithBorders.forEach((field) => {
    field.classList.remove('invalid-input');
  });
}

submitButton.addEventListener('click', showInvalidFieldsBorders);

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
  removeInvalidFieldsBorders();
  setTimeout(() => {
    getRoomCapacity();
    setPrice();
    address.value = `${initialCoordinates.lat}, ${initialCoordinates.lng}`;
  }, 0)
});

export {enableForm, address, adForm};
