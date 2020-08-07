import React from "react";
import CardsContainer from "../Card/CardContainer";
import styles from './Wrapper.module.css'


const Table = () => {
  return(
    <div className={styles.container}>
        <CardsContainer/>
    </div>
  )
}
 export default Table