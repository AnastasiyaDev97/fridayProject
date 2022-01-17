import {ReactElement} from "react";

type RatingProps = {
    grade: number
}


export const Rating = ({grade}: RatingProps) => {
    const STAR_COUNT = 5
    let rating: ReactElement[] = []

    for (let i = 0; i < STAR_COUNT; i++) {

        rating = [...rating, <Star selected={grade > i} />]
    }

    return (
        <div>
            {rating}
        </div>
    )
}

type starPropsType = {
    selected: boolean
}

function Star({selected}: starPropsType) {
    return (
        <span>{selected ?<b>Star </b>:"Star "}</span>
    )
}