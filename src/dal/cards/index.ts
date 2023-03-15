import URI from 'urijs';

import { clientAPI } from '..';

import {
  addNewCardPayloadType,
  getCardsQueryParamsType,
  getCardsResponseType,
  ResponseAddCardType,
  ResponseUpdateCardType,
  updateCardPayloadType,
  updateCardRatingType,
} from './types';

const cardsAPI = clientAPI.enhanceEndpoints({ addTagTypes: ['Cards'] }).injectEndpoints({
  endpoints: build => ({
    getCards: build.query<getCardsResponseType, getCardsQueryParamsType>({
      query(queryParams) {
        const URL = new URI(`cards/card`);

        URL.addQuery({ ...queryParams });

        return {
          url: URL.toString(),
        };
      },
      providesTags: ['Cards'],
      transformResponse: (response: { data: getCardsResponseType }) => response.data,
    }),
    addCard: build.mutation<ResponseAddCardType, addNewCardPayloadType>({
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
    deleteCard: build.mutation<void, string>({
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
    updateCard: build.mutation<ResponseUpdateCardType, updateCardPayloadType>({
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
    updateCardGrade: build.mutation<
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
});

export const {
  useAddCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardGradeMutation,
  useUpdateCardMutation,
} = cardsAPI;
