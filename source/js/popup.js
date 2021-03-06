const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const typeDictionary = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

// Функция, возвращаюшая список удобств объекта размещения в виде элементов HTML-списка
const createFeaturesList = (features) => {
  const featuresFragment = document.createDocumentFragment();
  features.forEach((feature) => {
    const newElement = document.createElement('li');
    const newElementClass = `popup__feature--${feature}`;
    newElement.classList.add(newElementClass);
    newElement.classList.add('popup__feature');
    featuresFragment.appendChild(newElement);
  })
  return featuresFragment;
};

// Функция, возвращаюшая фотографии объекта размещения в виде элементов HTML
const createPhotosList = (photos, template) => {
  const photosFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const newElement = template.cloneNode(true);
    newElement.src = photo;
    photosFragment.appendChild(newElement);
  })
  return photosFragment;
};

// Функция, определяющая окончание слова в зависимости от числительного
const declineWord = (number, words) => {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
};

const createSimilarCard = ({author, offer}) => {
  const similarCardElement = similarCardTemplate.cloneNode(true);

  // Обязательные поля формы
  similarCardElement.querySelector('.popup__title').textContent = offer.title;
  similarCardElement.querySelector('.popup__text--address').textContent = offer.address;
  similarCardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;

  const popupType = similarCardElement.querySelector('.popup__type');
  if (offer.type) {
    popupType.textContent = typeDictionary[offer.type];
  } else {
    popupType.remove();
  }

  const popupCapacity = similarCardElement.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    popupCapacity.textContent = `${offer.rooms} ${declineWord(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${declineWord(offer.guests, ['гостя', 'гостей', 'гостей'])}`;
  } else {
    popupCapacity.remove();
  }

  const popupTime = similarCardElement.querySelector('.popup__text--time');
  if (offer.checkin && offer.checkout) {
    popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    popupTime.remove();
  }

  const cardFeatures = similarCardElement.querySelector('.popup__features');
  if (offer.features.length) {
    cardFeatures.innerHTML = '';
    cardFeatures.appendChild(createFeaturesList(offer.features));
  } else {
    cardFeatures.remove();
  }

  const popupDescription = similarCardElement.querySelector('.popup__description');
  if (offer.description) {
    popupDescription.textContent = offer.description;
  } else {
    popupDescription.remove();
  }

  const cardPhotos = similarCardElement.querySelector('.popup__photos');
  if (offer.photos.length) {
    const cardPhotoTemplate = similarCardElement.querySelector('.popup__photo');
    cardPhotos.innerHTML = '';
    cardPhotos.appendChild(createPhotosList(offer.photos, cardPhotoTemplate));
  } else {
    cardPhotos.remove();
  }

  const popupAvatar = similarCardElement.querySelector('.popup__avatar');
  if (author.avatar) {
    popupAvatar.src = author.avatar;
  } else {
    popupAvatar.remove();
  }

  return similarCardElement;
};

export {createSimilarCard};
