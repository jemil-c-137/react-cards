
import React, {useEffect, useMemo} from "react";
import styles from './Card.module.css'



export const Card = (props) => {

  useMemo(() => {
    let shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }

    shuffle(props.cardsPage.cards)
  }, [])

  let compareHandler = (comparingCards) => {
    if (comparingCards[0].type === comparingCards[1].type) {
      comparingCards.forEach(card => {
      props.matchCards(card.id)
      })
      props.unSetComparing()
    } else {
      debugger;
      props.unSetComparing()
    }
  }

  useEffect(() => {
    if(props.cardsPage.toCompare.length === 2) {
      compareHandler(props.cardsPage.toCompare)
    }
  })

  let handleClick = (e) => {
    if (props.cardsPage.canFlip && !e.isComparing) {
      props.flipCard(e.id)
      props.handleCanFlip(false)
      setTimeout(() => {
        props.addToCompare(e.id)
        props.compareSwitcher(e)
        props.handleCanFlip(true)
      }, 500)
    } else if (e.isComparing) {
      props.unSetComparing()
    }
  }

  let cards = props.cardsPage.cards
    .filter(card => card.isGuessed === false)
    .map(card => {
    return(
        <div onClick={() => handleClick(card)}
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




