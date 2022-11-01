import React, { Component } from "react";
import { randomWord } from './words';

import "./Hangman.css";

import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);

    this.state = { 
      nWrong: 0, 
      guessed: new Set(), 
      answer: "apple"
      // answer: randomWord() 
    };

    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  // reset the game and put things in default
  reset() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    // deconstructor
    const { answer, guessed } = this.state;

    return answer
      .split("")
      .map(ltr => (guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;

    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    const  { handleGuess } = this;
    const { guessed } = this.state;

    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, index) => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    const { nWrong, answer} = this.state;
    const { images, maxWrong } = this.props;


    // const { guessedWord, generateButtons } = this;
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const altText = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameState = this.generateButtons();
    if(isWinner) gameState = "You Win!";
    if(gameOver) gameState = "You Lose!";

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={images[nWrong]} alt={altText}/>
        <p>Guessed Wrong: {this.state.nWrong}</p>
        <p className='Hangman-word'>{!gameOver ?  this.guessedWord() : this.state.answer}</p>
        <p className='Hangman-btns'>{gameState}</p>

        
        {/* { answer === this.guessedWord().join("") ? <p>You WIN!</p> :

          (nWrong === maxWrong ?
        <div>
          <p>YOU LOSE </p>
          <p>Correct Word is: {answer}</p>
        </div>
        :
        <div>

      </div>)
      } */}

      <button id='reset' onClick={this.reset}>Reset Game</button>
      </div>
    );
  }
}

export default Hangman;
