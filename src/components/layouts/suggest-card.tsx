import { UserEntity } from '@/entities/user-entity';
import { Box, Button, Text } from '@chakra-ui/react';
import { Avatar } from '../ui/avatar';
import { useAuthStore } from '@/stores/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateFollowSchemaDTO,
  DeleteFollowSchemaDTO,
} from '@/utils/schemas/follow-schemas';
import { FollowResponse } from '@/features/follow/type/follow-response';
import { api } from '@/libs/api';
import axios from 'axios';
import { toaster } from '../ui/toaster';

export function SuggestCard(suggest: UserEntity) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const followingId = suggest.id;

  const followedId = user?.id;

  const { mutateAsync: mutateFollow } = useMutation<
    FollowResponse,
    Error,
    CreateFollowSchemaDTO
  >({
    mutationKey: ['Follows'],
    mutationFn: async (data: CreateFollowSchemaDTO) => {
      const response = await api.post('/follows', data);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
      toaster.create({ title: `Something went wrong`, type: 'error' });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['suggest-users'] });
      await queryClient.invalidateQueries({ queryKey: ['check'] });
    },
  });

  const { mutateAsync: mutateUnFollow } = useMutation<
    FollowResponse,
    Error,
    DeleteFollowSchemaDTO
  >({
    mutationKey: ['UnFollows'],
    mutationFn: async (data: DeleteFollowSchemaDTO) => {
      const response = await api.delete(
        `/follows/${followedId}/${followingId}`,
        { data }
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
      toaster.create({ title: `Something went wrong`, type: 'error' });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['suggest-users'] });
      await queryClient.invalidateQueries({ queryKey: ['check'] });
    },
  });

  async function onFollow(data: CreateFollowSchemaDTO) {
    await mutateFollow(data);
  }
  async function unFollow(data: DeleteFollowSchemaDTO) {
    await mutateUnFollow(data);
  }

  return (
    <Box
      display={'flex'}
      gap={'16px'}
      paddingBottom={'16px'}
      borderColor={'outline'}
      paddingX={'24px'}
    >
      <Avatar
        name={suggest.profile?.fullname}
        src={
          suggest.profile?.avatarUrl ??
          `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${suggest.profile?.fullname}`
        }
        shape="full"
        width={'45px'}
      />

      <Box display={'flex'} flexDirection={'column'} flex={'264'}>
        <Text fontWeight={'bold'}>{suggest.profile?.fullname}</Text>
        <Text color={'secondary'}>@{suggest.username}</Text>
      </Box>

      <Button
        flex={'99'}
        borderRadius={'full'}
        variant={'outline'}
        border={'1px solid white'}
        marginY={'auto'}
        onClick={() => {
          if (suggest.isFollow) {
            unFollow({ followingId: suggest.id, followedId: user.id });
          } else {
            onFollow({ followingId: suggest.id, followedId: user.id });
          }
        }}
      >
        {suggest.isFollow ? 'Unfollow' : 'Follow'}
      </Button>
    </Box>
  );
}
