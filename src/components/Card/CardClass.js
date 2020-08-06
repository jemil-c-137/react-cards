import React from "react";
import styles from './Card.module.css'


export function Card(props) {

  let cards = props.cards
    .filter(card => card.isGuessed === false)
    .map(card => {
      return (
        <div onClick={() => props.handleClick(card)}
             className={styles.cardContainer + ' ' + (card.isClicked && styles.clicked)}>
          <div className={styles.cardFace + ' ' + styles.cardInner}>
            <img className={styles.pic} src={card.face} alt=""/>
          </div>
          <div className={styles.cardBack + ' ' + styles.cardInner}>
          </div>
        </div>
      )
    })

  return (
    <div className={styles.boxing}>
      {cards}
    </div>
  )
}



