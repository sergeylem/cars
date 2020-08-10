import React, { Component } from 'react';
import './styles.css'
import getFourRndImages from './components/getFourRndImages';
import PlaySound from './components/playSound';

class App extends Component {
  state = {
    imgList: [
      { id: 0, img: require('./assets/images/0.jpg'), sound: require('./assets/sounds/0.mp3'), name: 'Toyota Camry' },
      { id: 1, img: require('./assets/images/1.jpg'), sound: require('./assets/sounds/1.mp3'), name: 'Mitsubishi Lancer' },
      { id: 2, img: require('./assets/images/2.jpg'), sound: require('./assets/sounds/2.mp3'), name: 'Mercedes-Benz CLS 63' },
      { id: 3, img: require('./assets/images/3.jpg'), sound: require('./assets/sounds/3.mp3'), name: 'Hyundai Accent' },
      { id: 4, img: require('./assets/images/4.jpg'), sound: require('./assets/sounds/4.mp3'), name: 'Hyundai Elantra' },
      { id: 5, img: require('./assets/images/5.jpg'), sound: require('./assets/sounds/5.mp3'), name: 'Mazda 6' },
      { id: 6, img: require('./assets/images/6.jpg'), sound: require('./assets/sounds/6.mp3'), name: 'Volkswagen Jetta' },
      { id: 7, img: require('./assets/images/7.jpg'), sound: require('./assets/sounds/7.mp3'), name: 'Audi Q7' },
      { id: 8, img: require('./assets/images/8.jpg'), sound: require('./assets/sounds/8.mp3'), name: 'Hyundai Santa Fe' },
      { id: 9, img: require('./assets/images/9.jpg'), sound: require('./assets/sounds/9.mp3'), name: 'Hyundai Sonata' },
      { id: 10, img: require('./assets/images/10.jpg'), sound: require('./assets/sounds/10.mp3'), name: 'Kia Sportage' },
      { id: 11, img: require('./assets/images/11.jpg'), sound: require('./assets/sounds/11.mp3'), name: 'Toyota Highlander' },
      { id: 12, img: require('./assets/images/12.jpg'), sound: require('./assets/sounds/12.mp3'), name: 'Audi A8' },
      { id: 13, img: require('./assets/images/13.jpg'), sound: require('./assets/sounds/13.mp3'), name: 'Tesla Roadster' },
      { id: 14, img: require('./assets/images/14.jpg'), sound: require('./assets/sounds/14.mp3'), name: 'Audi A6' },
      { id: 15, img: require('./assets/images/15.jpg'), sound: require('./assets/sounds/15.mp3'), name: 'Rolls Royce Phantom' },
      { id: 16, img: require('./assets/images/16.jpg'), sound: require('./assets/sounds/16.mp3'), name: 'Ford Crown Victory' },
      { id: 17, img: require('./assets/images/17.jpg'), sound: require('./assets/sounds/17.mp3'), name: 'BMW X5' },
      { id: 18, img: require('./assets/images/18.jpg'), sound: require('./assets/sounds/18.mp3'), name: 'Ford Explorer' },
      { id: 19, img: require('./assets/images/19.jpg'), sound: require('./assets/sounds/19.mp3'), name: 'Ford Focus' },
      { id: 20, img: require('./assets/images/20.jpg'), sound: require('./assets/sounds/20.mp3'), name: 'Ford Mustang' },
      { id: 21, img: require('./assets/images/21.jpg'), sound: require('./assets/sounds/21.mp3'), name: 'Mazda CX5' },
      { id: 22, img: require('./assets/images/22.jpg'), sound: require('./assets/sounds/22.mp3'), name: 'Volkswagen Passat' },
      { id: 23, img: require('./assets/images/23.jpg'), sound: require('./assets/sounds/23.mp3'), name: 'Toyota RAV4' },
      { id: 24, img: require('./assets/images/24.jpg'), sound: require('./assets/sounds/24.mp3'), name: 'Subaru Impreza' },
      { id: 25, img: require('./assets/images/25.jpg'), sound: require('./assets/sounds/25.mp3'), name: 'Volkswagen Tuareg' },
      { id: 26, img: require('./assets/images/26.jpg'), sound: require('./assets/sounds/26.mp3'), name: 'Mercedes-G63' },
      { id: 27, img: require('./assets/images/27.jpg'), sound: require('./assets/sounds/27.mp3'), name: 'Tesla Model 3' },
      { id: 28, img: require('./assets/images/28.jpg'), sound: require('./assets/sounds/28.mp3'), name: 'BMW X6' },
      { id: 29, img: require('./assets/images/29.jpg'), sound: require('./assets/sounds/29.mp3'), name: 'Tesla Model X' }
    ],
    rndImages: [0, 0, 0, 0], //Хранятся индексы imgList 4-х картинок
    questionIndex: 0,
    maxArray: 29,
    correctAnswer: false,
    playResultAnswer: false,
    playError: true,
    playQuestion: true,
    countCorrectAnswer: 0,
    countWrongAnswer: 0,
    gameOver: false
  };

  componentDidMount() {
    this.initialState(this.state.maxArray);
  }

  initialState = (maxArray) => {
    const rndIndexes = getFourRndImages(maxArray); //Получить 4 случайных индекса из массива imgList         
    const questionIndex = Math.floor(Math.random() * 4); //Индекс озвученной картинки 
    this.setState({ rndImages: rndIndexes, questionIndex: questionIndex }); //Запомнить 4 картинки и индекс озвученной картинки 
  }

  changeImgList = (buttonIndex) => {
    let tmpArray = this.state.imgList;  //imgList записываю во временный массив 
    const rndImages = this.state.rndImages; //ХРАНЯТСЯ ИНДЕКСЫ!
    const maxArray = this.state.maxArray;
    const idImage = tmpArray[rndImages[buttonIndex]].id; //Нахожу картинку по индексу кнопки

    const imageIndex = tmpArray.findIndex(idImg => idImg.id === idImage); //Нахожу индекс картинки в imgList по картинке
    tmpArray.splice(imageIndex, 1);  //Удаляю эту картинку из imgList

    const rndIndexes = getFourRndImages(maxArray - 1); //Получить 4 случайных индекса из массива imgList
    const questionIndex = Math.floor(Math.random() * 4); //Индекс озвученной картинки 

    this.setState({
      imgList: tmpArray, maxArray: (maxArray - 1), rndImages: rndIndexes, questionIndex: questionIndex,
      correctAnswer: false, playResultAnswer: false
    });
  };

  checkAnswer = (buttonIndex) => {
    if (buttonIndex === this.state.questionIndex) {
      if (this.state.imgList.length > 4) {
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
          playSound = (<PlaySound urlStr={require('./assets/sounds/e1.mp3')} />);

        } else {
          playSound = (<PlaySound urlStr={require('./assets/sounds/e3.mp3')} />);
        }
      } else {
        playSound = (<PlaySound urlStr={require('./assets/sounds/s1.mp3')} />);
        nextBtn = true;
      };
    }

    if (this.state.playQuestion === true) {
      playQuestion = (
        <PlaySound urlStr={this.state.imgList[this.state.rndImages[this.state.questionIndex]].sound} />
      );
    }
    else {
      playQuestion = (//Включил <div>, чтобы был рендеринг 
        <div>
          <PlaySound urlStr={this.state.imgList[this.state.rndImages[this.state.questionIndex]].sound} />
        </div>
      );
    }
    if (this.state.gameOver === true) {
      playGameOver = (
        <PlaySound urlStr={require('./assets/sounds/s1.wav')} />
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
            src={this.state.imgList[this.state.rndImages[0]].img}
            alt="Image1" />
          <img
            className='image-btn'
            onClick={() => this.checkAnswer(1)}
            src={this.state.imgList[this.state.rndImages[1]].img}
            alt="Image2" />
          <img
            className='next-repeat-btn'
            onClick={() => this.repeatAnswer()}
            src={require('./assets/arrows/speaker1.png')}
            alt="ImageRepeat" />
        </div>
        <div className="container3">
          <h5>{this.state.countCorrectAnswer} : {this.state.countWrongAnswer}</h5>
        </div>
        <div className="container2">
          <img
            className='image-btn'
            onClick={() => this.checkAnswer(2)}
            src={this.state.imgList[this.state.rndImages[2]].img}
            alt="Image3" />
          <img
            className='image-btn'
            onClick={() => this.checkAnswer(3)}
            src={this.state.imgList[this.state.rndImages[3]].img}
            alt="Image4" />
          <img
            className={nextBtn ? "next-repeat-btn" : "next-repeat-btn-disabled"}
            onClick={nextBtn ? () => this.changeImgList(this.state.questionIndex) :
              null}
            src={require('./assets/arrows/arrow2.png')}
            alt="ImageNext" />
        </div>
      </div>
    );
  }
}

export default App;