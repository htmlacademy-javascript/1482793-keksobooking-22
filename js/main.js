'use strict';

// Функция, возвращающая случайное целое число из переданного диапазона включительно (задание выполнено с использованием материалов сайта learn.javascript.ru и книги "JS для детей")
const getRandomInteger = (min, max) => {
  if (min >= 0 && max >= min) {
    return Math.floor(min + Math.random() * (max - min));
  }
  return;
}

getRandomInteger(2, 30);

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно (задание выполнено с использованием материалов сайта learn.javascript.ru)
const getRandomNumber = (min, max, digitsAfterComma) => {
  if (min >= 0 && max >= min) {
    return +(min + Math.random() * (max - min)).toFixed(digitsAfterComma);
  }
  return;
}

getRandomNumber(2, 30, 7);
