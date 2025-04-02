import { Avatar } from '@/components/ui/avatar';
import { toaster } from '@/components/ui/toaster';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import {
  CreateFollowSchemaDTO,
  DeleteFollowSchemaDTO,
} from '@/utils/schemas/follow-schemas';
import { Box, Button, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FollowResponse } from './type/follow-response';
import { FollowerEntity } from './type/follows';

export function Followers({ follower, isFollow }: FollowerEntity) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const followingId = follower.id;
  const followedId = user.id;

  const { isPending: isPendingUnfollow, mutateAsync: mutateFollow } =
    useMutation<FollowResponse, Error, CreateFollowSchemaDTO>({
      mutationKey: ['Follows'],
      mutationFn: async (data: CreateFollowSchemaDTO) => {
        const response = await api.post<FollowResponse>('/follows', data);
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
        await queryClient.invalidateQueries({ queryKey: ['follower-users'] });
        await queryClient.invalidateQueries({ queryKey: ['suggest-users'] });
      },
    });

  const { isPending: isPendingFollow, mutateAsync: mutateUnFollow } =
    useMutation<FollowResponse, Error, DeleteFollowSchemaDTO>({
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
        await queryClient.invalidateQueries({ queryKey: ['follower-users'] });
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
      borderColor={'outline'}
      padding={'16px 0'}
      //   justifyContent={"space-between"}
    >
      <Avatar
        name={follower.profile.fullname}
        src={
          follower.profile.avatarUrl ||
          `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${follower.profile.fullname}`
        }
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'} flex={'7'}>
        <Text fontWeight={'bold'}>{follower.profile.fullname}</Text>
        <Text color={'secondary'}>@{follower.username}</Text>

        <Text cursor={'pointer'}>{follower.profile.bio}</Text>
      </Box>

      <Button
        flex={'1'}
        borderRadius={'full'}
        variant={'outline'}
        border={'1px solid white'}
        marginY={'auto'}
        disabled={isPendingFollow || isPendingUnfollow}
        onClick={() =>
          isFollow
            ? unFollow({ followingId: follower.id, followedId: user.id })
            : onFollow({ followingId: follower.id, followedId: user.id })
        }
      >
        {isFollow ? 'Unfollow' : 'Follow'}
      </Button>
    </Box>
  );
}
