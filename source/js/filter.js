const filter = document.querySelector('.map__filters');

const selects = filter.querySelectorAll('select');

const typeSelect = filter.querySelector('#housing-type');

const priceSelect = filter.querySelector('#housing-price');

const roomsSelect = filter.querySelector('#housing-rooms');

const guestsSelect = filter.querySelector('#housing-guests');

const featuresFieldset = filter.querySelector('#housing-features');

const disableFilter = () => {
  filter.classList.add('map__filters--disabled');
  selects.forEach((select) => {
    select.disabled = true;
  });
  featuresFieldset.disabled = true;
};

disableFilter();

const enableFilter = () => {
  filter.classList.remove('map__filters--disabled');
  selects.forEach((select) => {
    select.disabled = false;
  });
  featuresFieldset.disabled = false;
};

const getFilterByPrice = (data) => {
  const LOW_PRICE = 10000;

  const HIGH_PRICE = 50000;

  switch (priceSelect.value) {
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
  const checkedFeatures = featuresFieldset.querySelectorAll('input:checked');
  return Array.from(checkedFeatures).every((input) => {
    return data.offer.features.includes(input.value);
  });
};

const filterAds = (data) => {
  const filterByType = typeSelect.value === 'any' || typeSelect.value === data.offer.type;

  const filterByRooms = roomsSelect.value === 'any' || +roomsSelect.value === data.offer.rooms;

  const filterByGuests = guestsSelect.value === 'any' || +guestsSelect.value === data.offer.guests;

  const filterByPrice = getFilterByPrice(data);

  const filterByFeatures = getFilterByFeatures(data);

  return filterByType && filterByRooms && filterByGuests && filterByPrice && filterByFeatures;
};

const setFilterChange = (cb) => {
  filter.addEventListener('change', () => {
    cb();
  });
};

const setFilterReset = (cb) => {
  filter.addEventListener('reset', () => {
    setTimeout(() => {
      cb();
    }, 0);
  });
};

export {enableFilter, disableFilter, filter, filterAds, setFilterChange, setFilterReset};
