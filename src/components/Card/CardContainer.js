import {
  cardClickedAC,
  comparingAC,
  handleFlipCardAC,
  setMathchedCards,
  setToCompare,
  undoComparing
} from "../../Redux/rootReducer";
import {connect} from "react-redux";
import {Card} from "./CardClass";
import React from "react";


export class CardContainer extends React.Component {



  render() {

    let shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array // ? check is this immutable thing
    }

    shuffle(this.props.cardsPage.cards)
    return (
     <>
       <Card cards={this.props.cardsPage.cards}/>
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
    }
  }
}
const CardsContainer = connect(mapStateToProps, mapDispatchToProps)(CardContainer)

export default CardsContainer