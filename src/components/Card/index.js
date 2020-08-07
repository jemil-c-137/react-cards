import React from "react";
import styles from './Card.module.css'


export function Card(props) {
  debugger;
  let cards = props.cards
    .map(card => {
      return (
        <div key={card.id.toString()} onClick={() => props.handleClick(card)}
             className={styles.cardContainer + ' ' + (card.isClicked && styles.clicked)}>
          <div className={styles.cardFace + ' ' + styles.cardInner}>
            <img className={styles.pic} src={card.face} alt=""/>
          </div>
          {
            card.isGuessed
              ? <div className={styles.cardHide + ' ' + styles.cardInner}> </div>
              : <div className={styles.cardBack + ' ' + styles.cardInner}> </div>
          }
         {/* {
            props.guessedCards.length === 16 &&
            <button className={styles.newGame} onClick={() => {
            props.restart()
            }
            }>New game</button>
          }*/}
        </div>
      )
    })

  return (
    <>
      {cards}
    </>
  )
}



