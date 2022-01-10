


/*type ratingValueType = 0 | 1 | 2 | 3 | 4 | 5*/
type RatingProps = {
    grade: number

}


export const Rating = ({grade}: RatingProps) => {
    /*   const grade=useSelector<RootReducerType, number>(state=>state.cards.cards)*/

    const STAR_COUNT = 5
    let rating: any = []



    for (let i = 0; i < STAR_COUNT; i++) {

        rating = [...rating, <Star selected={grade > i} />]
    }

    return (
        <div>
            {
                rating
            }
        </div>
    )
}

type starPropsType = {
    /* selected:boolean
     onclick:(rat:ratingValueType)=>void
     ratingValue:ratingValueType*/
    selected: boolean

}

function Star({selected}: starPropsType) {
    return (
        <span  /*onClick={()=>props.onclick(props.ratingValue)}*/>{selected ? <b>Star</b> : 'Star'}</span>
    )
}