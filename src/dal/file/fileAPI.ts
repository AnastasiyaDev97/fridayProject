import URI from 'urijs';

import { builderType, clientAPI } from '..';

export const fileAPI = clientAPI
  .enhanceEndpoints({ addTagTypes: ['Packs'] })
  .injectEndpoints({
    endpoints: (build: builderType) => ({
      setFile: build.mutation<void, File>({
        query(file) {
          const URL = new URI(`file`);
          const formData = new FormData();

          formData.append('image', file);

          return {
            url: URL.toString(),
            method: 'POST',
            body: formData,
          };
        },
      }),
      getFile: build.query<void, void>({
        query() {
          const URL = new URI(`file`);

          return {
            url: URL.toString(),
          };
        },
        transformResponse: (response: { data: any }) => response.data,
      }),
    }),
  });
