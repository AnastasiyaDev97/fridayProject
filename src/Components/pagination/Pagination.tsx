import { FC, memo, useCallback, useState } from 'react';
import styles from './Pagination.module.scss';
import SuperButton from '../TestComponents/components/c2-SuperButton/SuperButton';
import { Nullable } from 'types/Nullable';

type PaginatorPropsType = {
  totalItemCount: Nullable<number>;
  pageCount: Nullable<number>;
  currentPage: Nullable<number>;
  onChangePageClick: (currentPage: number) => void;
  portionSize: number;
};

const START_VALUE_PORTION_NUMBER = 1;

const Paginator: FC<PaginatorPropsType> = memo(
  ({
    totalItemCount,
    pageCount,
    currentPage,
    onChangePageClick,
    portionSize,
  }) => {
    let [portionNumber, setPortionNumber] = useState(
      START_VALUE_PORTION_NUMBER
    );

    let pagesCount;
    let portionCount;
    if (totalItemCount && pageCount) {
      pagesCount = Math.ceil(totalItemCount / pageCount);
      portionCount = Math.ceil(pagesCount / portionSize);
    }
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    const styleForBtn = { padding: '5px', margin: '0 5px', fontWeight: 'bold' };
    const conditionForShowButton = portionNumber > START_VALUE_PORTION_NUMBER;
    let pages = [];

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
          .filter(
            (page) =>
              page >= leftPortionPageNumber && page <= rightPortionPageNumber
          )
          .map((page) => {
            const classNameForPage =
              page === currentPage
                ? `${styles.pageNum} ${styles.activePage}`
                : styles.pageNum;

            const onSpanClick = () => {
              onChangePageClick(page);
            };

            return (
              <span
                key={page}
                className={classNameForPage}
                onClick={onSpanClick}
              >
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
  }
);

export default Paginator;