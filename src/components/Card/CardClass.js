import React, {useEffect, useMemo} from "react";
import styles from './Card.module.css'


export class Card extends React.Component {


  componentDidMount() {
    debugger
    // optimize
  }

  componentDidUpdate(prevProps) {
    debugger;
    if (prevProps.cardsPage.toCompare !== this.props.cardsPage.toCompare
      && this.props.cardsPage.toCompare.length === 2) {
        const comparingCards = this.props.cardsPage.toCompare
        if (comparingCards[0].type === comparingCards[1].type) {
          comparingCards.forEach(card => {
            this.props.matchCards(card.id)
          })
          this.props.unSetComparing()
        } else {
          this.props.unSetComparing()
        }
    }
  }

  handleClick = (e) => {
    if (this.props.cardsPage.canFlip && !e.isComparing) {
      this.props.flipCard(e.id)
      this.props.handleCanFlip(false)
      setTimeout(() => {
        this.props.addToCompare(e.id)
        this.props.compareSwitcher(e)
        this.props.handleCanFlip(true)
      }, 500)
    } else if (e.isComparing) {
      this.props.unSetComparing()
    }
  }

  render() {
  debugger;


    let cards = this.props.cards
      .filter(card => card.isGuessed === false)
      .map(card => {
        return (
          <div onClick={() => this.handleClick(card)}
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
}



