import React from 'react';
import Pokeball from '../../images/Pokeball.svg';
import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <img src={Pokeball} alt="pokeball" className={styles.root} />
  )
}