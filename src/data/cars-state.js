import data from '../data/data.json';

const CARS = {
  data: data,
  rndImages: [0, 0, 0, 0], //Хранятся индексы data 4-х картинок
  questionIndex: 0,
  maxArray: 29,
  correctAnswer: false,
  playResultAnswer: false,
  playError: true,
  playQuestion: true,
  countCorrectAnswer: 0,
  countWrongAnswer: 0,
  gameOver: false
} 

export default CARS;