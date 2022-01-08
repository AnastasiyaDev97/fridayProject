export type getCardsResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export type getCardsQueryParamsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type addNewCardPayloadType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: 0 | 1 | 2 | 3 | 4 | 5
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}
export type updateCardPayloadType = {
    card: {
        _id: string
        question?: string
        answer?: string
        grade?: 0 | 1 | 2 | 3 | 4 | 5
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}