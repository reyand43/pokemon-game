import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { Button } from '../../components/Button/Button';
import React from 'react';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleClickStart = () => {
    navigate('/select-pokemon')
  }

  return (
    <div className={styles.root}>
      <Button onClick={handleClickStart}>Start Game</Button>
    </div>
  );
}