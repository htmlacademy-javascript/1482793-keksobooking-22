import {createSimilarAds} from './data.js';

// const MAP_CANVAS = document.querySelector('#map-canvas');

const SIMILAR_CARD_TEMPLATE = document.querySelector('#card').content.querySelector('.popup');

const SIMILAR_ADS = createSimilarAds();

const TYPE_DICTIONARY = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
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
};

// Функция, определяющая окончание слова в зависимости от числительного (подсмотрела решение здесь - https://realadmin.ru/coding/sklonenie-na-javascript.html)
const declineWord = (number, words) => {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
};

const createSimilarCard = ({author, offer}) => {
  const SIMILAR_CARD_ELEMENT = SIMILAR_CARD_TEMPLATE.cloneNode(true);
  SIMILAR_CARD_ELEMENT.querySelector('.popup__title').textContent = offer.title;
  SIMILAR_CARD_ELEMENT.querySelector('.popup__text--address').textContent = offer.address;
  SIMILAR_CARD_ELEMENT.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  SIMILAR_CARD_ELEMENT.querySelector('.popup__type').textContent = TYPE_DICTIONARY[offer.type];
  SIMILAR_CARD_ELEMENT.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${declineWord(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${declineWord(offer.guests, ['гостя', 'гостей', 'гостей'])}`;
  SIMILAR_CARD_ELEMENT.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const CARD_FEATURES = SIMILAR_CARD_ELEMENT.querySelector('.popup__features');
  CARD_FEATURES.innerHTML = '';
  CARD_FEATURES.appendChild(createFeaturesList(offer.features));
  SIMILAR_CARD_ELEMENT.querySelector('.popup__description').textContent = offer.description;

  const CARD_PHOTOS = SIMILAR_CARD_ELEMENT.querySelector('.popup__photos');
  const CARD_PHOTO_TEMPLATE = SIMILAR_CARD_ELEMENT.querySelector('.popup__photo');
  CARD_PHOTOS.innerHTML = '';
  CARD_PHOTOS.appendChild(createPhotosList(offer.photos, CARD_PHOTO_TEMPLATE));
  SIMILAR_CARD_ELEMENT.querySelector('.popup__avatar').src = author.avatar;

  return SIMILAR_CARD_ELEMENT;
};

export {SIMILAR_ADS, createSimilarCard};
