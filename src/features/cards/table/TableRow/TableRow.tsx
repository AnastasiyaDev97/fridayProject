import React, {FC, memo, MouseEvent} from "react";
import style from "../UniversalTable.module.scss";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import SuperButton from "../../../../Components/TestComponents/components/c2-SuperButton/SuperButton";
import {RootReducerType} from "../../../../store/store";
import {COMPONENT_NAME} from "../../../../enum/ComponentName";


type TableRowT={
    item:{
        name?: string
        cardsCount?: number
        updated: string
        created?: string
        user_id?: string
        _id: string
        question?: string
        answer?: string
        grade?: number
    }
    component: string
    onDeleteButtonClick?: (id: string) => void
    onUpdateButtonClick?: (id: string) => void
    onLearnPackClick?: (packId: string) => void
}
export const TableRow:FC<TableRowT>=memo(({item,component,onDeleteButtonClick,onUpdateButtonClick,
                                              onLearnPackClick})=>{

    const navigate = useNavigate()
    const userId = useSelector<RootReducerType, string>(state => state.profile._id)

    const CONDITION_FOR_DISABLE_BUTTON = item.user_id !== userId

    const onLearnButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onLearnPackClick!(item._id)
    }

    const onDeleteModalCallClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onDeleteButtonClick!(item._id)
    }

    const onOpenCardClick = () => {
        if ((item.cardsCount! > 0) || (item.user_id === userId)) {
            navigate(`/cards/${item._id}`)
        }
    }

    const onUpdateModalCallClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onUpdateButtonClick!(item._id)
    }

    return(
        <tr onClick={onOpenCardClick}>
            {Object.entries(item).map(([key, value], i) => {
                const conditionForHidingCell = (key !== "user_id") && (key !== "_id")
                if (conditionForHidingCell) {
                    return (
                        <td key={i}><div className={style.cell}>{value}</div></td>
                    )
                }
            })}
            <td className={style.btns}>
                <SuperButton disabled={CONDITION_FOR_DISABLE_BUTTON}
                             onClick={onDeleteModalCallClick}>Delete</SuperButton>
                <SuperButton
                    disabled={CONDITION_FOR_DISABLE_BUTTON} onClick={onUpdateModalCallClick}>
                    Edit</SuperButton>
                {component === COMPONENT_NAME.PACKS &&
                <SuperButton onClick={onLearnButtonClick} disabled={item.cardsCount! === 0}>Learn</SuperButton>}</td>
        </tr>
    )
})