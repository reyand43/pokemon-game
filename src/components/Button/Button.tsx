import React, { FC } from 'react';
import styles from './Button.module.scss';

interface IProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: FC<IProps> = ({ children, onClick, disabled }) => {
  return (
    <button className={styles.root} onClick={onClick} disabled={disabled}>{children}</button>
  )
}