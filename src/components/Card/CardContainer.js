import {
  cardClickedAC,
  comparingAC,
  handleFlipCardAC, restartGameAC,
  setMathchedCards,
  setToCompare,
  undoComparing
} from "../../Redux/rootReducer";
import {connect} from "react-redux";
import {Card} from "./index";
import React from "react";


export class CardContainer extends React.Component {

  restart = (guessedCards) => {
    if (guessedCards.length === this.props.cards.length) {
      this.props.restartGame()
    }
  }
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
  compareCards = (comparingCards) => {
    if (comparingCards[0].type === comparingCards[1].type) {
      comparingCards.forEach(card => {
        this.props.matchCards(card.id)
      })
      this.props.unSetComparing()
    } else {
      this.props.unSetComparing()
    }
  }

  componentDidUpdate(prevProps) {
    let guessedCards = this.props.cards.filter(card => card.isGuessed === true);
    if (this.props.toCompare.length === 2) {
      this.compareCards(this.props.toCompare)
    }
    if (guessedCards.length === 16) {
      this.restart(this.props.cards)
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
    cards: state.cards,
    toCompare: state.toCompare,
    canFlip: state.canFlip
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
    restartGame: () => {
      dispatch(restartGameAC())
    }
  }
}

const CardsContainer = connect(mapStateToProps, mapDispatchToProps)(CardContainer)

export default CardsContainer