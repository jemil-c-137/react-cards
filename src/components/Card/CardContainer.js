import {
  cardClickedAC,
  comparingAC,
  handleFlipCardAC, restartGameAC,
  setMathchedCards,
  setToCompare, shuffleCardsAC,
  undoComparing
} from "../../Redux/rootReducer";
import {connect} from "react-redux";
import {Card} from "./index";
import React from "react";


export class CardContainer extends React.Component {

  restart = (guessedCards) => {
    debugger;
    if(guessedCards.length === this.props.cards.length) {
      this.props.restartGame()
/*      setTimeout( () => {
        this.shuffle(this.props.cards)
      })*/

    }

  }/*
  shuffle = (cardsToShuffle) => {
    for (let i = cardsToShuffle.length - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [cardsToShuffle[i], cardsToShuffle[j]] = [cardsToShuffle[j], cardsToShuffle[i]]
    }
    this.props.shuffleAlgorithm(cardsToShuffle)
  }*/
  handleClick = (e) => {
    if (this.props.canFlip && !e.isComparing && !e.isGuessed) {
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
  componentDidMount() {
   // this.shuffle(this.props.cards)
  }


  compareCards = (comparingCards) => {
    //const comparingCards = this.props.toCompare
    //if (comparingCards.length === 2) {
      if (comparingCards[0].type === comparingCards[1].type) {
        comparingCards.forEach(card => {
          this.props.matchCards(card.id)
        })
        this.props.unSetComparing()
      } else {
        this.props.unSetComparing()
      }
    //}
  }


  componentDidUpdate(prevProps) {
    debugger;
    let guessedCards = this.props.cards.filter(card => card.isGuessed === true);
    if (this.props.toCompare.length === 2) {
      this.compareCards(this.props.toCompare)
    }
   /* if (this.props.toCompare.length === 2) {
      console.log(this.props)
      const comparingCards = this.props.toCompare
      if (comparingCards[0].type === comparingCards[1].type) {
        comparingCards.forEach(card => {
          this.props.matchCards(card.id)
        })
        this.props.unSetComparing()
      } else {
        this.props.unSetComparing()
      }
    } */if ( guessedCards.length === 16) {
      debugger;
      this.restart(this.props.cards)
/*      this.props.restartGame()
      setTimeout(() => {
        this.shuffle(this.props.cards)
      })*/
    }
  }


  render() {
    return (
     <>
       <Card handleClick={this.handleClick}
             cards={this.props.cards}
             guessedCards={this.props.cards.filter(card => card.isGuessed === true)}
             restart={this.restart}
       />
     </>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cardsPage.cards,
    toCompare: state.cardsPage.toCompare,
    canFlip: state.cardsPage.canFlip
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    flipCard: (id) => {
      dispatch(cardClickedAC(id))
    },
    handleCanFlip: (switcher) => {
      dispatch(handleFlipCardAC(switcher))
    },
    addToCompare: (comparingCard) => {
      dispatch(setToCompare(comparingCard))
    },
    compareSwitcher: (comparingCard) => {
      dispatch(comparingAC(comparingCard))
    },
    matchCards: (cardId) => {
      dispatch(setMathchedCards(cardId))
    },
    unSetComparing: () => {
      dispatch(undoComparing())
    },
    shuffleAlgorithm: (cardsToShuffle) => {
      dispatch(shuffleCardsAC(cardsToShuffle))
    },
    restartGame: () => {
      dispatch(restartGameAC())
    }
  }
}

const CardsContainer = connect(mapStateToProps, mapDispatchToProps)(CardContainer)

export default CardsContainer