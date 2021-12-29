import React, {useState} from "react";
import styles from './Pagination.module.scss'
import SuperButton from "../../../Components/TestComponents/components/c2-SuperButton/SuperButton";

type PaginatorPropsType = {
    totalItemCount: number
    pageSize: number
    currentPage: number
    changePageHandler: (currentPage: number) => void
    portionSize: number
}

let Paginator = (props: PaginatorPropsType) => {

    let pagesCount = Math.ceil(props.totalItemCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;
    const styleForBtn = {padding: '5px', margin: '0 5px', fontWeight: 'bold'}

    return <div className={styles.paginator}>
        {portionNumber > 1 &&
        <SuperButton
            style={styleForBtn} onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>&#8592;</SuperButton>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span key={p}
                             className={p === props.currentPage ? `${styles.pageNum} ${styles.activePage}` : styles.pageNum}
                             onClick={() => {
                                 props.changePageHandler(p);
                             }}>{p}</span>
            })}
        {portionCount > portionNumber &&
        <SuperButton style={styleForBtn}
                     onClick={() => {
                         setPortionNumber(portionNumber + 1)
                     }}>&#8594;</SuperButton>}
    </div>
}

export default Paginator;