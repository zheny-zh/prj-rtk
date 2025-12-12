import { useEffect, useRef } from "react";

type Props = {
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
  rootMargin?: string;
  threshold?: number;
};

export const useInfiniteScroll = ({
  hasNextPage,
  isFetching,
  fetchNextPage,
  rootMargin = "100px",
  threshold = 0.1,
}: Props) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMoreHandler = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    // IntersectionObserver отслеживает элементы и сообщает, насколько они видны во viewport
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length && entries[0].isIntersecting) {
          loadMoreHandler();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [loadMoreHandler]);

  return { observerRef };
};
