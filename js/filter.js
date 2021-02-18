const FILTER = document.querySelector('.map__filters');
const SELECTS = FILTER.querySelectorAll('select');
const FEATURES_FIELDSET = FILTER.querySelector('#housing-features');

const disableFilter = () => {
  FILTER.classList.add('map__filters--disabled');
  SELECTS.forEach((select) => {
    select.disabled = true;
  });
  FEATURES_FIELDSET.disabled = true;
};

disableFilter();

const enableFilter = () => {
  FILTER.classList.remove('map__filters--disabled');
  SELECTS.forEach((select) => {
    select.disabled = false;
  });
  FEATURES_FIELDSET.disabled = false;
};

export {enableFilter};
