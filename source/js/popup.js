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

// Функция, определяющая окончание слова в зависимости от числительного (подсмотрела решение здесь - https://realadmin.ru/coding/sklonenie-na-javascript.html)
const declineWord = (number, words) => {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
};

const createSimilarCard = ({author, offer}) => {
  const similarCardElement = similarCardTemplate.cloneNode(true);
  similarCardElement.querySelector('.popup__title').textContent = offer.title;
  similarCardElement.querySelector('.popup__text--address').textContent = offer.address;
  similarCardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  similarCardElement.querySelector('.popup__type').textContent = typeDictionary[offer.type];
  similarCardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${declineWord(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${declineWord(offer.guests, ['гостя', 'гостей', 'гостей'])}`;
  similarCardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const cardFeatures = similarCardElement.querySelector('.popup__features');
  cardFeatures.innerHTML = '';
  cardFeatures.appendChild(createFeaturesList(offer.features));
  similarCardElement.querySelector('.popup__description').textContent = offer.description;

  const cardPhotos = similarCardElement.querySelector('.popup__photos');
  const cardPhotoTemplate = similarCardElement.querySelector('.popup__photo');
  cardPhotos.innerHTML = '';
  cardPhotos.appendChild(createPhotosList(offer.photos, cardPhotoTemplate));
  similarCardElement.querySelector('.popup__avatar').src = author.avatar;

  return similarCardElement;
};

export {createSimilarCard};
