import { instance } from '../apiConfig';

import {
  addNewCardPayloadType,
  getCardsQueryParamsType,
  getCardsResponseType,
  updateCardPayloadType,
  updateCardRatingType,
} from './types';

export const cardsAPI = {
  getCards(getCardsQueryParams: getCardsQueryParamsType) {
    return instance
      .get<getCardsResponseType>(`cards/card`, { params: getCardsQueryParams })
      .then(res => {
        return res.data;
      });
  },

  async addCard(card: addNewCardPayloadType) {
    const res = await instance.post(`cards/card`, card);

    return res.data;
  },
  async deleteCard(id: string) {
    const res = await instance.delete(`cards/card/?id=${id}`);

    return res.data;
  },
  async updateCard(card: updateCardPayloadType) {
    const res = await instance.put(`cards/card`, card);

    return res.data;
  },
  async updateCardGrade(grade: number, card_id: string) {
    const res = await instance.put<updateCardRatingType>(`cards/grade`, {
      grade,
      card_id,
    });

    return res.data.updatedGrade;
  },
};
