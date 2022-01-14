import {CardType} from "../dal/cards/types";


export const convertDateFormat = (dateAsString: string) => {
    let date = new Date(dateAsString)
    return `${addZeroToDate(date.getDate())}.${addZeroToDate(date.getMonth() + 1)}.${date.getFullYear()}`
}

export const addZeroToDate = (date: number) => {
    if (date.toString().length === 1) {
        return `0${date}`
    }
    return date
}

export const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}