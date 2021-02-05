'use strict';

const TITLE = 'Заголовок объявления';

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECK_IN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECK_OUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = 'Описание объявления';

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const SIMILAR_ADS_COUNT = 10;

// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (min, max) => {
  if (min >= 0 && max >= min) {
    return Math.floor(min + Math.random() * (max - min));
  }
  return;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getRandomNumber = (min, max, digitsAfterComma) => {
  if (min >= 0 && max >= min) {
    return +(min + Math.random() * (max - min)).toFixed(digitsAfterComma);
  }
  return;
};

// Функция, возвращающая число с ведущим нулем
const getFirstZero = (number) => {
  return number < 10 ? '0' + number : number;
}

// Функция, генерирующая случайный элемент массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

// Функция, генерирующая уникальный массив случайной длины из заданного массива
const getRandomArray = (array) => {
  let newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray.slice(0, getRandomInteger(1, newArray.length));
};

// Функция, генерирующая объект описания похожего объявления неподалеку
const createAd = () => {
  let coordinateX = getRandomNumber(35.65000, 35.70000, 5);
  let coordinateY = getRandomNumber(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: 'img/avatars/user' + getFirstZero(getRandomInteger(1, 8)) + '.png',
    },
    offer: {
      title: TITLE,
      address: coordinateX + ', ' + coordinateY,
      price: getRandomInteger(0, 1000000),
      type: getRandomArrayElement(TYPE),
      rooms:  getRandomInteger(0, 100),
      guests:  getRandomInteger(0, 100),
      checkin: getRandomArrayElement(CHECK_IN_TIME),
      checkout: getRandomArrayElement(CHECK_OUT_TIME),
      features: getRandomArray(FEATURES),
      description: DESCRIPTION,
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: coordinateX,
      y: coordinateY,
    },
  };
};

// Функция, генерирующая массив объектов описаний похожих объявлений неподалеку
const similarAds = new Array(SIMILAR_ADS_COUNT).fill(null).map(() => createAd());

similarAds;
