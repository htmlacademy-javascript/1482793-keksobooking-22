import {createSimilarAds} from './data.js';

const MAP_CANVAS = document.querySelector('.map__canvas');

const SIMILAR_CARD_TEMPLATE = document.querySelector('#card').content.querySelector('.popup');

const SIMILAR_ADS = createSimilarAds();

// Функция, возвращающая русский текст для типа объекта размещения
const getAccommodationType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
};

// Функция, возвращаюшая список удобств объекта размещения в виде элементов HTML-списка
const createFeaturesList = (features) => {
  const FEATURES_FRAGMENT = document.createDocumentFragment();
  features.forEach((feature) => {
    const NEW_ELEMENT = document.createElement('li');
    const NEW_ELEMENT_CLASS = `popup__feature--${feature}`;
    NEW_ELEMENT.classList.add(NEW_ELEMENT_CLASS);
    NEW_ELEMENT.classList.add('popup__feature');
    FEATURES_FRAGMENT.appendChild(NEW_ELEMENT);
  })
  return FEATURES_FRAGMENT;
};

// Функция, возвращаюшая фотографии объекта размещения в виде элементов HTML
const createPhotosList = (photos, template) => {
  const PHOTOS_FRAGMENT = document.createDocumentFragment();
  photos.forEach((photo) => {
    const NEW_ELEMENT = template.cloneNode(true);
    NEW_ELEMENT.src = photo;
    PHOTOS_FRAGMENT.appendChild(NEW_ELEMENT);
  })
  return PHOTOS_FRAGMENT;
}

const createSimilarCard = ({author, offer}) => {
  const SIMILAR_CARD_ELEMENT = SIMILAR_CARD_TEMPLATE.cloneNode(true);
  SIMILAR_CARD_ELEMENT.querySelector('.popup__title').textContent = offer.title;
  SIMILAR_CARD_ELEMENT.querySelector('.popup__text--address').textContent = offer.address;
  SIMILAR_CARD_ELEMENT.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  SIMILAR_CARD_ELEMENT.querySelector('.popup__type').textContent = getAccommodationType(offer.type);
  SIMILAR_CARD_ELEMENT.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  SIMILAR_CARD_ELEMENT.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const CARD_FEATURES = SIMILAR_CARD_ELEMENT.querySelector('.popup__features');
  CARD_FEATURES.innerHTML = '';
  CARD_FEATURES.appendChild(createFeaturesList(offer.features));
  SIMILAR_CARD_ELEMENT.querySelector('.popup__description').textContent = offer.description;
  const CARD_PHOTOS = SIMILAR_CARD_ELEMENT.querySelector('.popup__photos');
  const CARD_PHOTO_TEMPLATE = SIMILAR_CARD_ELEMENT.querySelector('.popup__photo');
  CARD_PHOTOS.innerHTML = '';
  CARD_PHOTOS.appendChild(createPhotosList(offer.photos, CARD_PHOTO_TEMPLATE));
  SIMILAR_CARD_ELEMENT.querySelector('.popup__description').src = author.avatar;
  MAP_CANVAS.appendChild(SIMILAR_CARD_ELEMENT);
  return SIMILAR_CARD_ELEMENT;
};

const SIMILAR_CARD = createSimilarCard(SIMILAR_ADS[0]);
MAP_CANVAS.appendChild(SIMILAR_CARD);
