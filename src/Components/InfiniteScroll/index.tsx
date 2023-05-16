import { ReactNode, useEffect, useRef, useState } from 'react';

import { ReturnComponentType } from 'common/types';

type PropsType = {
  onBottomHit: () => void;
  isLoading: boolean;
  hasMoreData: boolean;
  loadOnMount: boolean;
  children: ReactNode;
};

function isBottom(ref: React.RefObject<HTMLDivElement>): boolean {
  if (!ref.current) {
    return false;
  }

  return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
}

export const InfiniteScroll = ({
  onBottomHit,
  isLoading,
  hasMoreData,
  children,
  loadOnMount,
}: PropsType): ReturnComponentType => {
  const [initialLoad, setInitialLoad] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadOnMount && initialLoad) {
      onBottomHit();
      setInitialLoad(false);
    }
  }, [onBottomHit, loadOnMount, initialLoad]);

  useEffect(() => {
    const onScroll = (): void => {
      if (!isLoading && hasMoreData && isBottom(contentRef)) {
        onBottomHit();
      }
    };

    document.addEventListener('scroll', onScroll);

    return () => document.removeEventListener('scroll', onScroll);
  }, [onBottomHit, isLoading, hasMoreData]);

  return <div ref={contentRef}>{children}</div>;
};
