import { api } from '@/libs/api';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef, useEffect } from 'react';
import { CardThread } from './card-thread';
import CreateThread from './create-thread';
import { ThreadEntity } from '@/entities/thread-entity';

export function Home() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    status,
  } = useInfiniteQuery({
    queryKey: ['threads'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(`/threads?page=${pageParam}&limit=5`);
      return res.data as ThreadEntity[];
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 5 ? undefined : allPages.length + 1;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <Box>
      <CreateThread />

      {isError && <Text color="red">{(error as Error).message}</Text>}

      {status === 'pending' ? (
        <Box display="flex" justifyContent="center" py={10}>
          <Spinner />
        </Box>
      ) : (
        <Box>
          {data?.pages
            .flat()
            .map((thread) => <CardThread {...thread} key={thread.id} />)}

          {/* loading spinner untuk load berikutnya */}
          {isFetchingNextPage && (
            <Box display="flex" justifyContent="center" py={5}>
              <Spinner />
            </Box>
          )}

          {/* sentinel div untuk observer */}
          <Box ref={loadMoreRef} h="20px" />
        </Box>
      )}
    </Box>
  );
}
