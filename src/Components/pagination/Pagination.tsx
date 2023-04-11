import { memo, useCallback, useState } from 'react';

import styles from './Pagination.module.scss';

import { Nullable } from 'common/types/Nullable';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { SuperButton } from 'components/SuperButton';

type PaginatorPropsType = {
  totalItemCount: Nullable<number>;
  pageCount: Nullable<number>;
  currentPage: Nullable<number>;
  onChangePageClick: (currentPage: number) => void;
  portionSize: number;
};

const START_VALUE_PORTION_NUMBER = 1;

export const Pagination = memo(
  ({
    totalItemCount,
    pageCount,
    currentPage,
    onChangePageClick,
    portionSize,
  }: PaginatorPropsType): ReturnComponentType => {
    const [portionNumber, setPortionNumber] = useState(START_VALUE_PORTION_NUMBER);

    let pagesCount;
    let portionCount;

    if (totalItemCount && pageCount) {
      pagesCount = Math.ceil(totalItemCount / pageCount);
      portionCount = Math.ceil(pagesCount / portionSize);
    }
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;
    const styleForBtn = { padding: '5px', margin: '0 5px', fontWeight: 'bold' };
    const conditionForShowButton = portionNumber > START_VALUE_PORTION_NUMBER;
    const pages = [];

    for (let i = 1; i <= (pagesCount || 0); i++) {
      pages.push(i);
    }

    const onButtonNextPageClick = useCallback(() => {
      setPortionNumber(portionNumber + 1);
    }, [portionNumber]);

    const onButtonPrevPageClick = useCallback(() => {
      setPortionNumber(portionNumber - 1);
    }, [portionNumber]);

    return (
      <div className={styles.paginator}>
        {conditionForShowButton && (
          <SuperButton style={styleForBtn} onClick={onButtonPrevPageClick}>
            &#8592;
          </SuperButton>
        )}

        {pages
          .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
          .map(page => {
            const classNameForPage =
              page === currentPage
                ? `${styles.pageNum} ${styles.activePage}`
                : styles.pageNum;

            const onSpanClick = (): void => {
              onChangePageClick(page);
            };

            return (
              <span key={page} className={classNameForPage} onClick={onSpanClick}>
                {page}
              </span>
            );
          })}

        {portionCount && portionCount > portionNumber && (
          <SuperButton style={styleForBtn} onClick={onButtonNextPageClick}>
            &#8594;
          </SuperButton>
        )}
      </div>
    );
  },
);
