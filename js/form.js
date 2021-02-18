const AD_FORM = document.querySelector('.ad-form');

const TYPE = AD_FORM.querySelector('#type');

const PRICE = AD_FORM.querySelector('#price');

const CHECK_IN_TIME = AD_FORM.querySelector('#timein');

const CHECK_OUT_TIME = AD_FORM.querySelector('#timeout');

const FIELDSETS = AD_FORM.querySelectorAll('fieldset');

const ADDRESS = AD_FORM.querySelector('#address');

const ACCOMODATION_PRICE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
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

ADDRESS.readOnly = true;

TYPE.addEventListener('change', () => {
  const MIN_PRICE = ACCOMODATION_PRICE[TYPE.value];
  PRICE.min = MIN_PRICE;
  PRICE.placeholder = MIN_PRICE;
});

CHECK_IN_TIME.addEventListener('change', () => {
  CHECK_OUT_TIME.value = CHECK_IN_TIME.value;
});

CHECK_OUT_TIME.addEventListener('change', () => {
  CHECK_IN_TIME.value = CHECK_OUT_TIME.value;
});

export {enableForm, ADDRESS};
