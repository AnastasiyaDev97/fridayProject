import s from './PacksParams.module.scss'
import MultiRangeSlider from "../../../features/cards/rangeSlider/RangeSlider";
import SuperButton from "../../TestComponents/components/c2-SuperButton/SuperButton";

type PacksParamsPropsT = {
    minCardsCount: number
    maxCardsCount: number
    onChangeMinHandler: (value: number) => void
    onChangeMaxHandler: (value: number) => void
    toggleShowCardsMode: (mode: boolean) => void
}

export const PacksParams = (props: PacksParamsPropsT) => {
    const showMyCards = () => {
        props.toggleShowCardsMode(true)
    }
    const showAllCards = () => {
        props.toggleShowCardsMode(false)
    }
    return (
        <div className={s.wrapper}>
            <h6>Show packs cards</h6>
            <div><SuperButton onClick={showMyCards}>My</SuperButton>
                <SuperButton onClick={showAllCards}>All</SuperButton></div>
            <MultiRangeSlider
                min={props.minCardsCount}
                max={props.maxCardsCount}
                onChange={({min, max}) => {
                }/*console.log(`min = ${min}, max = ${max}`)*/}
            />
        </div>
    )
}