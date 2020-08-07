
import rick from '../assets/imgs/rick.png'
import unity from '../assets/imgs/unity.png'
import morty from '../assets/imgs/morty.png'
import beth from '../assets/imgs/beth.png'
import meeseeks from '../assets/imgs/meeseeks.png'
import mrPoopy from '../assets/imgs/mr.png'
import summer from '../assets/imgs/summer.png'
import jerry from '../assets/imgs/jerry.png'



const CARD_CLICKED = 'CARD_CLICKED';
const GET_COMPARE = 'GET_COMPARE';
const SET_COMPARE = 'SET_COMPARE';
const DEL_COMPARE = 'DEL_COMPARE';
const SET_MATCHED = 'SET_MATCHED';
const SET_CAN_FLIP = 'FLIP_HANDLER';
const SHUFFLE_CARDS = 'SHUFFLE_CARDS';
const RESTART = 'RESTART'
const NEW_GAME = 'NEW_GAME'

export const initialState = {
    cards: [
      { id: 1, face: rick, type: 'rick', isGuessed: false, isComparing: false, isClicked: false},
      { id: 3, face: morty, type: 'morty', isGuessed: false, isComparing: false, isClicked: false},
      { id: 5, face: beth, type: 'beth', isGuessed: false, isComparing: false, isClicked: false},
      { id: 7, face: jerry, type: 'jerry', isGuessed: false, isComparing: false, isClicked: false},
      { id: 9, face: summer, type: 'summer', isGuessed: false, isComparing: false, isClicked: false},
      { id: 11, face: mrPoopy, type: 'mrPoopy', isGuessed: false, isComparing: false, isClicked: false},
      { id: 13, face: unity, type: 'unity', isGuessed: false, isComparing: false, isClicked: false},
      { id: 15, face: meeseeks, type: 'meeseeks', isGuessed: false, isComparing: false, isClicked: false},
      { id: 2, face: rick, type: 'rick', isGuessed: false, isComparing: false, isClicked: false},
      { id: 4, face: morty, type: 'morty', isGuessed: false, isComparing: false, isClicked: false},
      { id: 6, face: beth, type: 'beth', isGuessed: false, isComparing: false, isClicked: false},
      { id: 8, face: jerry, type: 'jerry', isGuessed: false, isComparing: false, isClicked: false},
      { id: 10, face: summer, type: 'summer', isGuessed: false, isComparing: false, isClicked: false},
      { id: 12, face: mrPoopy, type: 'mrPoopy', isGuessed: false, isComparing: false, isClicked: false},
      { id: 14, face: unity, type: 'unity', isGuessed: false, isComparing: false, isClicked: false},
      { id: 16, face: meeseeks, type: 'meeseeks', isGuessed: false, isComparing: false, isClicked: false},
    ],
    canFlip: true,
    toCompare: [],
    gameOver: true
}

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CARD_CLICKED: {
      return {
        ...state,
        cards: state.cards.map(card => {
          if (card.id === action.cardId) {
            return {...card, isClicked: true}
          }
          return {...card}
        })
      }
    }
    case SET_MATCHED: {
      return {
        ...state,
        cards: state.cards.map(card => {
          if (card.id === action.matchedCard) {
            return {...card, isGuessed: true}
          }
          return {...card}
        }
        )
      }
    }
    case SET_CAN_FLIP: {
      return {
        ...state,
        canFlip: action.toggle
      }
    }
    case GET_COMPARE: {
      return {
        ...state,
        toCompare: [...state.toCompare, action.comparingCard]
      }
    }
    case SET_COMPARE: {
      return {
        ...state,
        cards: state.cards.map(card => {
          if (card.id === action.comparingCard) {
            return {...card, isComparing: true}
          }
          return {...card}
        })
      }
    }
    case DEL_COMPARE: {
      return {
        ...state,
        toCompare: [],
        cards: state.cards.map(card => {
          return {...card, isClicked: false, isComparing: false}
        })
      }
    }
    case SHUFFLE_CARDS: {
      return {
        ...state
      }
    }

    case NEW_GAME: {
      return {
        ...state,
        gameOver: false
      }
    }

    case RESTART: {
      return  {
      ...initialState
      }
    }
    default:
      return state
  }

}

export const cardClickedAC = (cardId) => { return {type: CARD_CLICKED, cardId: cardId}}
export const handleFlipCardAC = (flipHandler) => { return {type: SET_CAN_FLIP, toggle: flipHandler}};
export const comparingAC = (comparingCard) => { return {type: GET_COMPARE, comparingCard: comparingCard}}
export const setToCompare = (comparingCard) => { return {type: SET_COMPARE, comparingCard: comparingCard}}
export const undoComparing = () => { return {type: DEL_COMPARE}};
export const setMathchedCards = (matchedCard) => { return {type: SET_MATCHED, matchedCard: matchedCard}};
export const shuffleCardsAC = (cards) => { return {type: SHUFFLE_CARDS, shuffledCards: cards }};
export const restartGameAC = () => { return {type: RESTART}}
export const newGameAC = () => { return{type: NEW_GAME}}
export default cardsReducer