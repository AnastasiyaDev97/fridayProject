import URI from 'urijs';

import { clientAPI } from '..';
import type { builderType } from '..';

import {
  CardType,
  addNewCardPayloadType,
  getCardsQueryParamsType,
  getCardsResponseType,
  updateCardPayloadType,
  updateCardRatingType,
} from './types';

const cardsAPI = clientAPI.enhanceEndpoints({ addTagTypes: ['Cards'] }).injectEndpoints({
  endpoints: (builder: builderType) => ({
    getCards: builder.query<getCardsResponseType, getCardsQueryParamsType>({
      query(queryParams) {
        const URL = new URI(`cards/card`);

        URL.addQuery({ ...queryParams });

        return {
          url: URL.toString(),
        };
      },
      providesTags: ['Cards'],
    }),
    addCard: builder.mutation<{ newCard: CardType }, addNewCardPayloadType>({
      query(data) {
        const URL = new URI(`cards/card`);

        return {
          url: URL.toString(),
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Cards'],
    }),
    deleteCard: builder.mutation<{ deletedCard: CardType }, string>({
      query(id) {
        const URL = new URI(`cards/card`);

        URL.addQuery({ id });

        return {
          url: URL.toString(),
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Cards'],
    }),
    updateCard: builder.mutation<{ updatedCard: CardType }, updateCardPayloadType>({
      query(data) {
        const URL = new URI(`cards/card`);

        return {
          url: URL.toString(),
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Cards'],
    }),
    updateCardGrade: builder.mutation<
      updateCardRatingType,
      { grade: number; card_id: string }
    >({
      query(data) {
        const URL = new URI(`cards/grade`);

        return {
          url: URL.toString(),
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Cards'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardGradeMutation,
  useUpdateCardMutation,
} = cardsAPI;
