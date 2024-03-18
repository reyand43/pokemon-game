import React, { FC } from 'react';
import Logo from '../../images/Logo.png';
import styles from './MainLayout.module.scss';

interface IProps {
  children: React.ReactNode;
}

export const MainLayout: FC<IProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <img src={Logo} alt="Logo" className={styles.logo} />
      {children}
    </div>
  )
}