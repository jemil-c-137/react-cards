import {
  cardClickedAC,
  comparingAC,
  handleFlipCardAC,
  setMathchedCards,
  setToCompare,
  undoComparing
} from "../../Redux/rootReducer";
import {connect} from "react-redux";
import {Card} from "./index";


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
const CardsContainer = connect(mapStateToProps, mapDispatchToProps)(Card)

export default CardsContainer