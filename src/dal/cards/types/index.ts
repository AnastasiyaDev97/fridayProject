export type getCardsResponseType = {
  cards: CardType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};

export interface CardType {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: string;
  updated: string;
  _id: string;
}

export type getCardsQueryParamsType = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id?: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};

export type addNewCardPayloadType = {
  card: {
    cardsPack_id: string;
    question?: string;
    answer?: string;
    grade?: 0 | 1 | 2 | 3 | 4 | 5;
    shots?: number;
    answerImg?: string;
    questionImg?: string;
    questionVideo?: string;
    answerVideo?: string;
  };
};
export type updateCardPayloadType = {
  card: updateCardType;
};

export type updateCardType = {
  _id: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};

export type updateCardRatingType = {
  token: string;
  tokenDeathTime: number;
  updatedGrade: updatedGradeType;
};
export type updatedGradeType = {
  _id: string;
  cardsPack_id: string;
  card_id: string;
  user_id: string;
  grade: number;
  shots: number;
};
