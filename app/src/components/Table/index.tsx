import React, { useEffect, useState } from 'react';
import styles from './Table.module.scss';
import { Row } from './Row';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getData, getPage, setCurrentPage } from '../../Redux/slices/userSlice';

export const Table = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.user.data);
  const [sortBy, setSortBy] = useState<'id' | 'title' | 'body' | ''>('');

  const { currentPage, totalCount, perPage, searchValue } = useAppSelector(
    (state) => state.user
  );

  const pagesCount = Math.ceil(totalCount / perPage);

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  useEffect(() => {
    dispatch(getData());
    dispatch(getPage({ currentPage, perPage, sortBy, searchValue }));
  }, [currentPage, sortBy, searchValue]);

  const onClickNext = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const onClickPrev = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div onClick={() => setSortBy('id')} className={styles.header__id}>
          ID
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0.353553"
              y1="0.646447"
              x2="6.18011"
              y2="6.47301"
              stroke="#FCFCFC"
            />
            <line
              x1="5.64645"
              y1="6.30331"
              x2="11.3033"
              y2="0.646453"
              stroke="white"
            />
          </svg>
        </div>
        <div
          onClick={() => setSortBy('title')}
          className={styles.header__title}
        >
          Заголовок
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0.353553"
              y1="0.646447"
              x2="6.18011"
              y2="6.47301"
              stroke="#FCFCFC"
            />
            <line
              x1="5.64645"
              y1="6.30331"
              x2="11.3033"
              y2="0.646453"
              stroke="white"
            />
          </svg>
        </div>
        <div onClick={() => setSortBy('body')} className={styles.header__text}>
          Описание
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0.353553"
              y1="0.646447"
              x2="6.18011"
              y2="6.47301"
              stroke="#FCFCFC"
            />
            <line
              x1="5.64645"
              y1="6.30331"
              x2="11.3033"
              y2="0.646453"
              stroke="white"
            />
          </svg>
        </div>
      </div>
      <div className={styles.rows}>
        {!data ? '' : data.map((el, i) => <Row key={i} data={el} />)}
      </div>
      <div className={styles.footer}>
        <button onClick={onClickPrev}>Назад</button>
        <div className={styles.pagination}>
          {pages.map((page, i) => (
            <span
              onClick={() => dispatch(setCurrentPage(page))}
              className={currentPage == page ? styles.active : ''}
              key={i}
            >
              {page}
            </span>
          ))}
        </div>
        <button onClick={onClickNext}>Далее</button>
      </div>
    </div>
  );
};
