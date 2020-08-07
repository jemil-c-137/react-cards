import React from "react";
import styles from './NewGame.module.css'

const RestartGame = (props) => {
  debugger;
  let shuffle = (cardsToShuffle) => {
    debugger;
    for (let i = cardsToShuffle.length - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [cardsToShuffle[i], cardsToShuffle[j]] = [cardsToShuffle[j], cardsToShuffle[i]]
    }
    props.shuffleCards(cardsToShuffle)
  }

  let startGame = () => {
    props.startNewGame()
  }

  return(
    <div className={styles.container}>
      <button onClick={() => {
        shuffle(props.cards)
        startGame()
      }}>
        New Game
      </button>
    </div>
  )
}

export default RestartGame