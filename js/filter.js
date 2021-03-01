const FILTER = document.querySelector('.map__filters');

const SELECTS = FILTER.querySelectorAll('select');

const TYPE_SELECT = FILTER.querySelector('#housing-type');

const PRICE_SELECT = FILTER.querySelector('#housing-price');

const ROOMS_SELECT = FILTER.querySelector('#housing-rooms');

const GUESTS_SELECT = FILTER.querySelector('#housing-guests');

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

const getFilterByPrice = (data) => {
  const LOW_PRICE = 10000;

  const HIGH_PRICE = 50000;

  switch (PRICE_SELECT.value) {
    case 'low':
      return data.offer.price < LOW_PRICE;
    case 'middle':
      return data.offer.price >= LOW_PRICE && data.offer.price <= HIGH_PRICE;
    case 'high':
      return data.offer.price > HIGH_PRICE;
    case 'any':
      return true;
  }
};

const getFilterByFeatures = (data) => {
  const CHECKED_FEATURES = FEATURES_FIELDSET.querySelectorAll('input:checked');
  return Array.from(CHECKED_FEATURES).every((input) => {
    return data.offer.features.includes(input.value);
  });
};

const filterAds = (data) => {
  const FILTER_BY_TYPE = TYPE_SELECT.value === 'any' || TYPE_SELECT.value === data.offer.type;

  const FILTER_BY_ROOMS = ROOMS_SELECT.value === 'any' || +ROOMS_SELECT.value === data.offer.rooms;

  const FILTER_BY_GUESTS = GUESTS_SELECT.value === 'any' || +GUESTS_SELECT.value === data.offer.guests;

  const FILTER_BY_PRICE = getFilterByPrice(data);

  const FILTER_BY_FEATURES = getFilterByFeatures(data);

  return FILTER_BY_TYPE && FILTER_BY_ROOMS && FILTER_BY_GUESTS && FILTER_BY_PRICE && FILTER_BY_FEATURES;
};

const setFilterChange = (cb) => {
  FILTER.addEventListener('change', () => {
    cb();
  });
};

const setFilterReset = (cb) => {
  FILTER.addEventListener('reset', () => {
    setTimeout(() => {
      cb();
    }, 0);
  });
};

export {enableFilter, disableFilter, FILTER, filterAds, setFilterChange, setFilterReset};
