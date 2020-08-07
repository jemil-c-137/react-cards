import React from 'react';

import Table from "./components/Wrapper";
import Header from "./components/Header";
import RestartGame from "./components/NewGame";
import {newGameAC, shuffleCardsAC} from "./Redux/rootReducer";
import {connect} from "react-redux";
import styles from './App.module.css'


function App(props) {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        {props.gameOver ? <RestartGame {...props}/>
          : <Table/>}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    gameOver: state.gameOver,
    cards: state.cards
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

export default connect(mapStateToProps, mapDispatchToProps)(App)

