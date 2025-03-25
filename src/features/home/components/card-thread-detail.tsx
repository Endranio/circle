import { LikeLogo, LikeOutline } from '@/assets/icons';
import MessageText from '@/assets/icons/message-text.svg';
import { Avatar } from '@/components/ui/avatar';
import { toaster } from '@/components/ui/toaster';
import { ThreadEntity } from '@/entities/thread-entity';
import { LikeResponse } from '@/features/like/dto/like-response';
import { api } from '@/libs/api';
import {
  CreateLikeSchemaDTO,
  DeleteLikeSchemaDTO,
} from '@/utils/schemas/like-schema';
import { Box, Button, Image, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function CardThreadDetail(thread: ThreadEntity) {
  const { threadId } = useParams();
  const queryClient = useQueryClient();
  const { isPending: isPendingUnlike, mutateAsync: mutateLike } = useMutation<
    LikeResponse,
    Error,
    CreateLikeSchemaDTO
  >({
    mutationKey: ['Likes'],
    mutationFn: async (data: CreateLikeSchemaDTO) => {
      const response = await api.post<LikeResponse>('/likes/thread', data);

      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }

      toaster.create({
        title: `Something wrong`,
        type: 'error',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`threads/${threadId}`],
      });
    },
  });
  const { isPending: isPendingLike, mutateAsync: mutateUnlike } = useMutation<
    LikeResponse,
    Error,
    DeleteLikeSchemaDTO
  >({
    mutationKey: ['Unlike'],
    mutationFn: async (data: DeleteLikeSchemaDTO) => {
      const response = await api.delete<LikeResponse>(
        `/likes/thread/${data.threadId}`
      );
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }

      toaster.create({
        title: 'Something went wrong!',
        type: 'error',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`threads/${threadId}`],
      });
    },
  });

  async function Like(data: CreateLikeSchemaDTO) {
    await mutateLike(data);
  }

  async function Unlike(data: DeleteLikeSchemaDTO) {
    await mutateUnlike(data);
  }

  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderBottom={'1px solid'}
      borderColor={'outline'}
      padding={'16px 0'}
    >
      <Box>
        <Avatar
          name={thread.user?.profile?.fullname}
          src={
            thread.user?.profile?.avatarUrl ||
            `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${thread.user?.profile?.fullname}`
          }
          shape="full"
          size="full"
          width={'50px'}
          height={'50px'}
        />
      </Box>

      <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
        <Box display={'flex'} gap={'4px'}>
          <Text fontWeight={'bold'}>{thread.user?.profile?.fullname}</Text>
          <Text color={'secondary'}>@{thread.user?.username}</Text>
        </Box>
        <Box>
          <Text>{thread.content}</Text>
          <Image
            src={thread.images}
            maxWidth={'300px'}
            maxHeight={'300px'}
            objectFit={'contain'}
          />
          <Text color={'secondary'}>
            {new Date(thread.createdAt).getHours()}h
          </Text>
        </Box>
        <Box display={'flex'}>
          <Button
            display={'flex'}
            variant={'ghost'}
            disabled={isPendingLike || isPendingUnlike}
            onClick={() =>
              thread.isLike
                ? Unlike({ threadId: thread.id })
                : Like({ threadId: thread.id })
            }
          >
            <Image src={thread.isLike ? LikeLogo : LikeOutline} />
            <Text>{thread.likesCount} Like</Text>
          </Button>
          <Button variant={'ghost'} display={'flex'} gap={'4px'}>
            <Image src={MessageText} />
            <Text>{thread.repliesCount}</Text>
            <Text>Replies</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
