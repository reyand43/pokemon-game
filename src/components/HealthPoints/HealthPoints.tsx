import React, { FC } from 'react';
import styles from './HealthPoints.module.scss'

interface IProps {
  value: number;
}

export const HealthPoints: FC<IProps> = ({ value }) => {
  return (
    <div className={styles.root}>
      <div className={styles.bar} style={{ width: `${value}%` }}>
        {value} HP
      </div>
    </div>
  )
}