import React, { useState, useEffect } from 'react';
import './styles.css'
import getFourRndImages from './components/getFourRndImages';
import PlaySound from './components/playSound';
import cars from './data/cars-data';

const App = () => {

  const [data, setData] = useState(cars.data);
  const [maxArray, setMaxArray] = useState(cars.maxArray);
  const [rndImages, setRndImages] = useState(cars.rndImages);
  const [questionIndex, setQuestionIndex] = useState(cars.questionIndex);
  const [correctAnswer, setCorrectAnswer] = useState(cars.correctAnswer);
  const [playResultAnswer, setPlayResultAnswer] = useState(cars.playResultAnswer);
  const [playError, setPlayError] = useState(cars.playError);
  const [countCorrectAnswer, setCountCorrectAnswer] = useState(cars.countCorrectAnswer);
  const [countWrongAnswer, setCountWrongAnswer] = useState(cars.countWrongAnswer);
  const [playQuestion, setPlayQuestion] = useState(cars.playQuestion);
  const [gameOver, setGameOver] = useState(cars.gameOver);


  // eslint-disable-next-line
  useEffect(() => initialState(), []);

  const initialState = () => {
    const rndIndexes = getFourRndImages(maxArray); //Получить 4 случайных индекса из массива cars         
    const questionIndex = Math.floor(Math.random() * 4); //Индекс озвученной картинки 
    setRndImages(rndIndexes); //Запомнить 4 картинки 
    setQuestionIndex(questionIndex); //Запомнить индекс озвученной картинки
  }

  const changeCars = (buttonIndex) => {
    let tmpArray = data;  //cars записываю во временный массив 
    const _rndImages = rndImages; //ХРАНЯТСЯ ИНДЕКСЫ!
    const _maxArray = maxArray;
    const idImage = tmpArray[_rndImages[buttonIndex]].id; //Нахожу картинку по индексу кнопки

    const imageIndex = tmpArray.findIndex(idImg => idImg.id === idImage); //Нахожу индекс картинки в cars по картинке
    tmpArray.splice(imageIndex, 1);  //Удаляю эту картинку из cars

    const rndIndexes = getFourRndImages(_maxArray - 1); //Получить 4 случайных индекса из массива cars
    const _questionIndex = Math.floor(Math.random() * 4); //Индекс озвученной картинки 

    setData(tmpArray);
    setMaxArray(_maxArray - 1);
    setRndImages(rndIndexes);
    setQuestionIndex(_questionIndex);
    setCorrectAnswer(false);
    setPlayResultAnswer(false);
  };

  const checkAnswer = (buttonIndex) => {
    if (buttonIndex === questionIndex) {
      if (data.length > 4) {
        setQuestionIndex(buttonIndex);
        setCorrectAnswer(true);
        setPlayResultAnswer(true);
        setPlayError(false);
        setCountCorrectAnswer(countCorrectAnswer + 1);
      }
      else {
        setGameOver(true);  //        alert("УРА! ФАНФАРЫ!");
      }
    }
    else {
      setCorrectAnswer(false);
      setPlayResultAnswer(true);
      setPlayError(!playError);
      setCountWrongAnswer(countWrongAnswer + 1);
    }
  };

  const repeatAnswer = () => {
    setPlayQuestion(!playQuestion)
  };


  let nextBtn = false;
  let playSoundQuestion, playSoundAnswer, playSoundGameOver;

  if (playResultAnswer === true) {
    if (correctAnswer === false) {
      nextBtn = false;
      if (playError === true) {
        playSoundAnswer = (<PlaySound urlStr="/assets/sounds/e1.mp3" />);

      } else {
        playSoundAnswer = (<PlaySound urlStr="/assets/sounds/e3.mp3" />);
      }
    } else {
      playSoundAnswer = (<PlaySound urlStr="/assets/sounds/s1.mp3" />);
      nextBtn = true;
    };
  }

  if (playQuestion === true) {
    playSoundQuestion = (
      <PlaySound urlStr={data[rndImages[questionIndex]].sound} />
    );
  }
  else {
    playSoundQuestion = (//Включил <div>, чтобы был рендеринг 
      <React.Fragment>
        <PlaySound urlStr={data[rndImages[questionIndex]].sound} />
      </React.Fragment>
    );
  }
  if (gameOver === true) {
    playSoundGameOver = (
      <PlaySound urlStr="/assets/sounds/s1.wav" />
    );
  }

  return (
    <div className="container1">
      {playSoundQuestion}
      {playSoundAnswer}
      {playSoundGameOver}
      <div className="container2">
        <img
          className='image-btn'
          onClick={() => checkAnswer(0)}
          src={data[rndImages[0]].img}
          alt="Image1" />
        <img
          className='image-btn'
          onClick={() => checkAnswer(1)}
          src={data[rndImages[1]].img}
          alt="Image2" />
        <img
          className='next-repeat-btn'
          onClick={() => repeatAnswer()}
          // src={require('/assets/arrows/speaker1.png')}
          src="/assets/arrows/speaker1.png"
          alt="ImageRepeat" />
      </div>
      <div className="container3">
        <h5>{countCorrectAnswer} : {countWrongAnswer}</h5>
      </div>
      <div className="container2">
        <img
          className='image-btn'
          onClick={() => checkAnswer(2)}
          src={data[rndImages[2]].img}
          alt="Image3" />
        <img
          className='image-btn'
          onClick={() => checkAnswer(3)}
          src={data[rndImages[3]].img}
          alt="Image4" />
        <img
          className={nextBtn ? "next-repeat-btn" : "next-repeat-btn-disabled"}
          onClick={nextBtn ? () => changeCars(questionIndex) :
            null}
          // src={require('/assets/arrows/arrow2.png')}
          src="/assets/arrows/arrow2.png"
          alt="ImageNext" />
      </div>
    </div>
  );
}

export default App;