import React from 'react';
import styles from './Table.module.scss';

interface RowProps {
  data: {
    id: number;
    title: string;
    body: string;
  };
}

export const Row: React.FC<RowProps> = ({ data }) => {
  return (
    <div className={styles.row}>
      <div className={styles.row__id}>{data.id}</div>
      <div className={styles.row__title}>{data.title}</div>
      <div className={styles.row__text}>{data.body}</div>
    </div>
  );
};
