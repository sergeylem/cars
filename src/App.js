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


  useEffect(() => initialState(), []);

  const initialState = () => {

    console.log('maxArray: ' + maxArray);

    // const rndIndexes = getFourRndImages(cars.maxArray); //Получить 4 случайных индекса из массива cars         
    // const questionIndex = Math.floor(Math.random() * 4); //Индекс озвученной картинки 
    // setRndImages(rndIndexes); //Запомнить 4 картинки 
    // setQuestionIndex(questionIndex); //Запомнить индекс озвученной картинки
    //    this.setState({ rndImages: rndIndexes, questionIndex: questionIndex }); //Запомнить 4 картинки и индекс озвученной картинки 
  }

  const changeCars = (buttonIndex) => {
    let tmpArray = cars.data;  //cars записываю во временный массив 
    const rndImages = cars.rndImages; //ХРАНЯТСЯ ИНДЕКСЫ!
    const maxArray = cars.maxArray;
    const idImage = tmpArray[rndImages[buttonIndex]].id; //Нахожу картинку по индексу кнопки

    const imageIndex = tmpArray.findIndex(idImg => idImg.id === idImage); //Нахожу индекс картинки в cars по картинке
    tmpArray.splice(imageIndex, 1);  //Удаляю эту картинку из cars

    const rndIndexes = getFourRndImages(maxArray - 1); //Получить 4 случайных индекса из массива cars
    const questionIndex = Math.floor(Math.random() * 4); //Индекс озвученной картинки 

    setData(tmpArray);
    setMaxArray(maxArray - 1);
    setRndImages(rndIndexes);
    setQuestionIndex(questionIndex);
    setCorrectAnswer(false);
    setPlayResultAnswer(false);

    // this.setState({
    //   data: tmpArray, maxArray: (maxArray - 1), rndImages: rndIndexes, questionIndex: questionIndex,
    //   correctAnswer: false, playResultAnswer: false
    // });
  };

  const checkAnswer = (buttonIndex) => {
    if (buttonIndex === cars.questionIndex) {
      if (cars.data.length > 4) {
        setQuestionIndex(buttonIndex);
        setCorrectAnswer(true);
        setPlayResultAnswer(true);
        setPlayError(false);
        setCountCorrectAnswer(cars.countCorrectAnswer + 1);

        // this.setState({ questionIndex: buttonIndex, correctAnswer: true, playResultAnswer: true, playError: false, countCorrectAnswer: this.state.countCorrectAnswer + 1 });
      }
      else {
        setGameOver(true);  //        alert("УРА! ФАНФАРЫ!");
        // this.setState({ gameOver: true }); //        alert("УРА! ФАНФАРЫ!");
      }
    }
    else {
      setCorrectAnswer(false);
      setPlayResultAnswer(true);
      setPlayError(!cars.playError);
      setCountWrongAnswer(cars.countWrongAnswer + 1);

      // this.setState((state) => ({ correctAnswer: false, playResultAnswer: true, playError: !state.playError, countWrongAnswer: this.state.countWrongAnswer + 1 }));
    }
  };

  const repeatAnswer = () => {
    setPlayQuestion(!cars.playQuestion)
    // this.setState((state) => ({ playQuestion: !state.playQuestion }));
  };


  let nextBtn = false;
  let playSoundQuestion, playSoundAnswer, playSoundGameOver;

  if (cars.playResultAnswer === true) {
    if (cars.correctAnswer === false) {
      nextBtn = false;
      if (cars.playError === true) {
        playSoundAnswer = (<PlaySound urlStr="/assets/sounds/e1.mp3" />);

      } else {
        playSoundAnswer = (<PlaySound urlStr="/assets/sounds/e3.mp3" />);
      }
    } else {
      playSoundAnswer = (<PlaySound urlStr="/assets/sounds/s1.mp3" />);
      nextBtn = true;
    };
  }

  if (cars.playQuestion === true) {
    playSoundQuestion = (
      <PlaySound urlStr={cars.data[cars.rndImages[cars.questionIndex]].sound} />
    );
  }
  else {
    playSoundQuestion = (//Включил <div>, чтобы был рендеринг 
      <div>
        <PlaySound urlStr={cars.data[cars.rndImages[cars.questionIndex]].sound} />
      </div>
    );
  }
  if (cars.gameOver === true) {
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
          src={cars.data[cars.rndImages[0]].img}
          alt="Image1" />
        <img
          className='image-btn'
          onClick={() => checkAnswer(1)}
          src={cars.data[cars.rndImages[1]].img}
          alt="Image2" />
        <img
          className='next-repeat-btn'
          onClick={() => repeatAnswer()}
          // src={require('/assets/arrows/speaker1.png')}
          src="/assets/arrows/speaker1.png"
          alt="ImageRepeat" />
      </div>
      <div className="container3">
        <h5>{cars.countCorrectAnswer} : {cars.countWrongAnswer}</h5>
      </div>
      <div className="container2">
        <img
          className='image-btn'
          onClick={() => checkAnswer(2)}
          src={cars.data[cars.rndImages[2]].img}
          alt="Image3" />
        <img
          className='image-btn'
          onClick={() => checkAnswer(3)}
          src={cars.data[cars.rndImages[3]].img}
          alt="Image4" />
        <img
          className={nextBtn ? "next-repeat-btn" : "next-repeat-btn-disabled"}
          onClick={nextBtn ? () => changeCars(cars.questionIndex) :
            null}
          // src={require('/assets/arrows/arrow2.png')}
          src="/assets/arrows/arrow2.png"
          alt="ImageNext" />
      </div>
    </div>
  );
}

export default App;