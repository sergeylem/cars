import React, { Component } from 'react';
import './styles.css'
import getFourRndImages from './components/getFourRndImages';
import PlaySound from './components/playSound';
import cars from './data/cars-state';

class App extends Component {

  state = cars;

  componentDidMount() {
    this.initialState(this.state.maxArray);
  }

  initialState = (maxArray) => {
    const rndIndexes = getFourRndImages(maxArray); //Получить 4 случайных индекса из массива cars         
    const questionIndex = Math.floor(Math.random() * 4); //Индекс озвученной картинки 
    this.setState({ rndImages: rndIndexes, questionIndex: questionIndex }); //Запомнить 4 картинки и индекс озвученной картинки 
  }

  changeCars = (buttonIndex) => {
    let tmpArray = this.state.cars;  //cars записываю во временный массив 
    const rndImages = this.state.rndImages; //ХРАНЯТСЯ ИНДЕКСЫ!
    const maxArray = this.state.maxArray;
    const idImage = tmpArray[rndImages[buttonIndex]].id; //Нахожу картинку по индексу кнопки

    const imageIndex = tmpArray.findIndex(idImg => idImg.id === idImage); //Нахожу индекс картинки в cars по картинке
    tmpArray.splice(imageIndex, 1);  //Удаляю эту картинку из cars

    const rndIndexes = getFourRndImages(maxArray - 1); //Получить 4 случайных индекса из массива cars
    const questionIndex = Math.floor(Math.random() * 4); //Индекс озвученной картинки 

    this.setState({
      cars: tmpArray, maxArray: (maxArray - 1), rndImages: rndIndexes, questionIndex: questionIndex,
      correctAnswer: false, playResultAnswer: false
    });
  };

  checkAnswer = (buttonIndex) => {
    if (buttonIndex === this.state.questionIndex) {
      if (this.state.cars.length > 4) {
        this.setState({ questionIndex: buttonIndex, correctAnswer: true, playResultAnswer: true, playError: false, countCorrectAnswer: this.state.countCorrectAnswer + 1 });
      }
      else {
        this.setState({ gameOver: true }); //        alert("УРА! ФАНФАРЫ!");
      }
    }
    else {
      this.setState((state) => ({ correctAnswer: false, playResultAnswer: true, playError: !state.playError, countWrongAnswer: this.state.countWrongAnswer + 1 }));
    }
  };

  repeatAnswer = () => {
    this.setState((state) => ({ playQuestion: !state.playQuestion }));
  };


  render() {
    let nextBtn = false;
    let playQuestion, playSound, playGameOver;

    if (this.state.playResultAnswer === true) {
      if (this.state.correctAnswer === false) {
        nextBtn = false;
        if (this.state.playError === true) {
          playSound = (<PlaySound urlStr="/assets/sounds/e1.mp3" />);

        } else {
          playSound = (<PlaySound urlStr="/assets/sounds/e3.mp3" />);
        }
      } else {
        playSound = (<PlaySound urlStr="/assets/sounds/s1.mp3" />);
        nextBtn = true;
      };
    }

    if (this.state.playQuestion === true) {
      playQuestion = (
        <PlaySound urlStr={this.state.data[this.state.rndImages[this.state.questionIndex]].sound} />
      );
    }
    else {
      playQuestion = (//Включил <div>, чтобы был рендеринг 
        <div>
          <PlaySound urlStr={this.state.cars[this.state.rndImages[this.state.questionIndex]].sound} />
        </div>
      );
    }
    if (this.state.gameOver === true) {
      playGameOver = (
        <PlaySound urlStr="/assets/sounds/s1.wav" />
      );
    }

    return (
      <div className="container1">
        {playQuestion}
        {playSound}
        {playGameOver}
        <div className="container2">
          <img
            className='image-btn'
            onClick={() => this.checkAnswer(0)}
            src={this.state.data[this.state.rndImages[0]].img}
            alt="Image1" />
          <img
            className='image-btn'
            onClick={() => this.checkAnswer(1)}
            src={this.state.data[this.state.rndImages[1]].img}
            alt="Image2" />
          <img
            className='next-repeat-btn'
            onClick={() => this.repeatAnswer()}
            // src={require('/assets/arrows/speaker1.png')}
            src="/assets/arrows/speaker1.png"
            alt="ImageRepeat" />
        </div>
        <div className="container3">
          <h5>{this.state.countCorrectAnswer} : {this.state.countWrongAnswer}</h5>
        </div>
        <div className="container2">
          <img
            className='image-btn'
            onClick={() => this.checkAnswer(2)}
            src={this.state.data[this.state.rndImages[2]].img}
            alt="Image3" />
          <img
            className='image-btn'
            onClick={() => this.checkAnswer(3)}
            src={this.state.data[this.state.rndImages[3]].img}
            alt="Image4" />
          <img
            className={nextBtn ? "next-repeat-btn" : "next-repeat-btn-disabled"}
            onClick={nextBtn ? () => this.changeCars(this.state.questionIndex) :
              null}
            // src={require('/assets/arrows/arrow2.png')}
            src="/assets/arrows/arrow2.png"
            alt="ImageNext" />
        </div>
      </div>
    );
  }
}

export default App;