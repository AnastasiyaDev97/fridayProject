import { memo, useCallback, useState } from 'react';

import type { URLSearchParamsInit } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import styles from './Pagination.module.scss';

import { EntityType } from 'common/types';
import { ReturnComponentType } from 'common/types/ReturnComponentType';
import { SuperButton } from 'components/SuperButton';
import { PORTION_SIZE } from 'constants/index';
import { PAGE_COUNT } from 'constants/table';

type PaginatorPropsType = {
  totalItemCount: number;
  currentPage: number;
  portionSize?: number;
  itemName: EntityType;
};

const START_VALUE_PORTION_NUMBER = 1;

export const Pagination = memo(
  ({
    totalItemCount,
    currentPage,
    portionSize = PORTION_SIZE,
    itemName,
  }: PaginatorPropsType): ReturnComponentType => {
    const [portionNumber, setPortionNumber] = useState(START_VALUE_PORTION_NUMBER);

    const [searchParams, setSearchParams] = useSearchParams();

    let pagesCount;
    let portionCount;

    if (totalItemCount && PAGE_COUNT) {
      pagesCount = Math.ceil(totalItemCount / PAGE_COUNT);
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

    const onChangePageClick = useCallback(
      (page: number) => {
        setSearchParams({
          ...Object.fromEntries([...searchParams]),
          [`page${itemName}`]: page.toString(),
        } as URLSearchParamsInit);
      },
      [setSearchParams, searchParams, itemName],
    );

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
