// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = (min, max) => {
  if (min >= 0 && max >= min) {
    return Math.floor(min + Math.random() * (max - min));
  }
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getRandomNumber = (min, max, digitsAfterComma) => {
  if (min >= 0 && max >= min) {
    return +(min + Math.random() * (max - min)).toFixed(digitsAfterComma);
  }
};

// Функция, возвращающая число с ведущим нулем
const getFirstZero = (number) => {
  return number < 10 ? `0${number}` : number;
}

// Функция, генерирующая случайный элемент массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

// Функция, генерирующая уникальный массив случайной длины из заданного массива
const getRandomArray = (array) => {
  let newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray.slice(0, getRandomInteger(1, newArray.length));
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export {getRandomInteger, getRandomNumber, getFirstZero, getRandomArrayElement, getRandomArray, isEscEvent};
