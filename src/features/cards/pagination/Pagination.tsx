import React, {FC, memo, useCallback, useState} from "react";
import styles from './Pagination.module.scss'
import SuperButton from "../../../Components/TestComponents/components/c2-SuperButton/SuperButton";

type PaginatorPropsType = {
    totalItemCount: number
    pageCount: number
    currentPage: number
    onChangePageClick: (currentPage: number) => void
    portionSize: number
}

const Paginator:FC<PaginatorPropsType> = memo(({totalItemCount, pageCount, currentPage, onChangePageClick, portionSize}) => {
    console.log('paginat')
    let [portionNumber, setPortionNumber] = useState(1);

    let pagesCount = Math.ceil(totalItemCount / pageCount);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    const styleForBtn = {padding: '5px', margin: '0 5px', fontWeight: 'bold'}

    const onSuperButtonClick = useCallback(() => {
        setPortionNumber(portionNumber + 1)
    },[portionNumber])

    return <div className={styles.paginator}>

        {portionNumber > 1 &&
        <SuperButton
            style={styleForBtn} onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>&#8592;</SuperButton>}

        {pages
            .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map((page) => {

                const onSpanClick = () => {
                    onChangePageClick(page)
                }

                return <span key={page}
                             className={page === currentPage ? `${styles.pageNum} ${styles.activePage}` : styles.pageNum}
                             onClick={onSpanClick}>{page}</span>
            })}
        {portionCount > portionNumber &&
        <SuperButton style={styleForBtn}
                     onClick={onSuperButtonClick}>&#8594;</SuperButton>}
    </div>
})

export default Paginator;