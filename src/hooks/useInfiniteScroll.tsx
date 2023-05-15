import { useCallback, useEffect, useState, useMemo } from 'react';

import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query';
import type { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

import { getUsersQueryParamsType, getUsersResponseType } from 'dal/users/types';

type useInfiniteScrollPropsType = {
  data: getUsersResponseType | undefined;
  fetch: LazyQueryTrigger<
    QueryDefinition<
      getUsersQueryParamsType,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        Record<string, unknown>,
        FetchBaseQueryMeta
      >,
      'Cards' | 'Packs',
      getUsersResponseType,
      'clientAPI'
    >
  >;
  searchParams: getUsersQueryParamsType;
  skip?: boolean;
};

const useInifiniteScroll = ({
  data,
  fetch,
  searchParams,
  skip = false,
}: useInfiniteScrollPropsType): void => {
  const [isLoadingList, setIsLoadingList] = useState(false);

  const [source, setSource] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchOptions = useMemo(
    () => ({
      ...searchParams,
      ...{ page: pageNumber },
    }),
    [pageNumber, searchParams],
  );

  const handleOnLoadMore = useCallback(() => {
    if (isLoadingList) {
      return;
    }

    setIsLoadingList(true);

    fetch(fetchOptions).then(response => {
      setSource([...source /* , ...(response?.data?.data || []) */]);

      setIsLoadingList(false);
      setPageNumber(previousPageNumber => previousPageNumber + 1);
    });
  }, [fetch, fetchOptions, isLoadingList, source]);

  const hasMore = useCallback(() => {
    /* if (data?.data?.length <= 0) {
      return false;
    }

    if (data?.meta?.total) {
      return source.length < data?.meta?.total;
    } */

    return true;
  }, [data, source.length]);

  const resetList = useCallback(() => {
    setSource([]);
    setIsLoadingList(false);
    setPageNumber(1);
  }, []);

  const forceOnLoadMore = useCallback(
    attributes => {
      if (isLoadingList) {
        return;
      }

      setIsLoadingList(true);

      /* fetch({
        searchParams: {
          ...searchParams,
          ...{ page: pageNumber },
          ...attributes,
        },
      }).then(response => {
        setSource([...source, ...(response?.data?.data || [])]);

        setIsLoadingList(false);
        setPageNumber(previousPageNumber => previousPageNumber + 1);
      }); */
    },
    [fetch, isLoadingList, pageNumber, searchParams, source],
  );

  useEffect(() => {
    if (!skip) {
      handleOnLoadMore();
    }
  }, [skip]);

  /*  return {
    source,
    dataLength: source.length,
    next: handleOnLoadMore,
    forceOnLoadMore,
    hasMore: hasMore(),
    resetList,
  }; */
};

export default useInifiniteScroll;
