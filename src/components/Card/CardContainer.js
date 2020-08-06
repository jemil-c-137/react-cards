import {
  cardClickedAC,
  comparingAC,
  handleFlipCardAC,
  setMathchedCards,
  setToCompare, shuffleCardsAC,
  undoComparing
} from "../../Redux/rootReducer";
import {connect} from "react-redux";
import {Card} from "./CardClass";
import React from "react";


export class CardContainer extends React.Component {

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

  componentDidMount() {
    let shuffle = (cardsToShuffle) => {
      for (let i = cardsToShuffle.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cardsToShuffle[i], cardsToShuffle[j]] = [cardsToShuffle[j], cardsToShuffle[i]]
      }
      this.props.shuffleAlgorithm(cardsToShuffle)
    }
    shuffle(this.props.cardsPage.cards)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
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


  render() {

    return (
     <>
       <Card handleClick={this.handleClick} cards={this.props.cardsPage.cards}
       />
     </>
      )
  }
}


const mapStateToProps = (state) => {
  return {
    cardsPage: state.cardsPageRed
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
    }
  }
}

const CardsContainer = connect(mapStateToProps, mapDispatchToProps)(CardContainer)

export default CardsContainer