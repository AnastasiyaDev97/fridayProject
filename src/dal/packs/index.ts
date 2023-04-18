import URI from 'urijs';

import { clientAPI } from '..';
import type { builderType } from '..';
import { Nullable } from '../../common/types/Nullable';

import {
  addNewPackPayloadType,
  getPacksQueryParamsType,
  getPacksResponseType,
  updatePackPayloadType,
} from './types';

const packsAPI = clientAPI.enhanceEndpoints({ addTagTypes: ['Packs'] }).injectEndpoints({
  endpoints: (build: builderType) => ({
    getPacks: build.query<getPacksResponseType, Nullable<getPacksQueryParamsType>>({
      query(queryParams) {
        const URL = new URI(`cards/pack`);

        URL.addQuery({ ...queryParams });

        return {
          url: URL.toString(),
        };
      },
    }),
    addPack: build.mutation<void, addNewPackPayloadType>({
      query(data) {
        const URL = new URI(`cards/pack`);

        return {
          url: URL.toString(),
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Packs'],
    }),
    deletePack: build.mutation<void, string>({
      query(id) {
        const URL = new URI(`cards/pack`);

        URL.addQuery({ id });

        return {
          url: URL.toString(),
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Packs'],
    }),
    updatePack: build.mutation<void, updatePackPayloadType>({
      query(data) {
        const URL = new URI(`cards/pack`);

        return {
          url: URL.toString(),
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Packs'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddPackMutation,
  useDeletePackMutation,
  useGetPacksQuery,
  useUpdatePackMutation,
} = packsAPI;
