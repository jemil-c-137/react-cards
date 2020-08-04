
import rick from '../assets/rick.png'
import unity from '../assets/unity.png'
import morty from '../assets/morty.png'
import beth from '../assets/beth.png'
import meeseeks from '../assets/meeseeks.png'
import mrPoopy from '../assets/mr.png'
import summer from '../assets/summer.png'
import jerry from '../assets/jerry.png'
import cover from '../assets/cover.png'


const CARD_CLICKED = 'CARD_CLICKED';

const CAN_FLIP = 'CAN_FLIP';
const GET_COMPARE = 'GET_COMPARE';
const SET_COMPARE = 'SET_COMPARE';
const DEL_COMPARE = 'DEL_COMPARE';
const SET_MATCHED = 'SET_MATCHED';
const SET_CAN_FLIP = 'FLIP_HANDLER';

export const initialState = {
    cards: [
      { id: 1, face: rick, back: cover, type: 'rick', isGuessed: false, isComparing: false, isClicked: false},
      { id: 3, face: morty, back: cover, type: 'morty', isGuessed: false, isComparing: false, isClicked: false},
      { id: 5, face: beth, back: cover, type: 'beth', isGuessed: false, isComparing: false, isClicked: false},
      { id: 7, face: jerry, back: cover, type: 'jerry', isGuessed: false, isComparing: false, isClicked: false},
      { id: 9, face: summer, back: cover, type: 'summer', isGuessed: false, isComparing: false, isClicked: false},
      { id: 11, face: mrPoopy, back: cover, type: 'mrPoopy', isGuessed: false, isComparing: false, isClicked: false},
      { id: 13, face: unity, back: cover, type: 'unity', isGuessed: false, isComparing: false, isClicked: false},
      { id: 15, face: meeseeks, back: cover, type: 'meeseeks', isGuessed: false, isComparing: false, isClicked: false},
      { id: 2, face: rick, back: cover, type: 'rick', isGuessed: false, isComparing: false, isClicked: false},
      { id: 4, face: morty, back: cover, type: 'morty', isGuessed: false, isComparing: false, isClicked: false},
      { id: 6, face: beth, back: cover, type: 'beth', isGuessed: false, isComparing: false, isClicked: false},
      { id: 8, face: jerry, back: cover, type: 'jerry', isGuessed: false, isComparing: false, isClicked: false},
      { id: 10, face: summer, back: cover, type: 'summer', isGuessed: false, isComparing: false, isClicked: false},
      { id: 12, face: mrPoopy, back: cover, type: 'mrPoopy', isGuessed: false, isComparing: false, isClicked: false},
      { id: 14, face: unity, back: cover, type: 'unity', isGuessed: false, isComparing: false, isClicked: false},
      { id: 16, face: meeseeks, back: cover, type: 'meeseeks', isGuessed: false, isComparing: false, isClicked: false},
    ],
    canFlip: true,
    isFlipping: true,
    toCompare: [

    ]
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
          return card
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
          return card
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
    case CAN_FLIP: {

      return {
        ...state,
        canFlip: true
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
          return card
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

    default:
      return state
  }

}

export const cardClickedAC = (cardId) => { return {type: CARD_CLICKED, cardId: cardId}}
export const handleFlipCardAC = (flipHandler) => { return {type: SET_CAN_FLIP, toggle: flipHandler}};
export const setCanFlip = () => {return {type: CAN_FLIP}};
export const comparingAC = (comparingCard) => { return {type: GET_COMPARE, comparingCard: comparingCard}}
export const setToCompare = (comparingCard) => { return {type: SET_COMPARE, comparingCard: comparingCard}}
export const undoComparing = () => { return {type: DEL_COMPARE}};
export const setMathchedCards = (matchedCard) => { return {type: SET_MATCHED, matchedCard: matchedCard}};
export default cardsReducer