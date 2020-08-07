import React from "react";
import CardsContainer from "../Card/CardContainer";
import styles from './Wrapper.module.css'
import RestartGame from "../NewGame";
import {connect} from "react-redux";
import {newGameAC, shuffleCardsAC} from "../../Redux/rootReducer";


const Table = (props) => {
  return(
    <div className={styles.container}>
      {
        props.gameOver ? <RestartGame {...props}/>
        : <CardsContainer/>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    gameOver: state.cardsPage.gameOver,
    cards: state.cardsPage.cards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    shuffleCards: () => {
      dispatch(shuffleCardsAC())
    },
    startNewGame: () => {
      dispatch(newGameAC())
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Table)