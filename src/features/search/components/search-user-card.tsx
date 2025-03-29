import { Avatar } from '@/components/ui/avatar';
import { toaster } from '@/components/ui/toaster';
import { FollowResponse } from '@/features/follow/type/follow-response';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import {
  CreateFollowSchemaDTO,
  DeleteFollowSchemaDTO,
} from '@/utils/schemas/follow-schemas';
import { Box, BoxProps, Button, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SearchUser } from '../type/search-user';

interface SearchUserCardProps extends BoxProps {
  SearchUserData: SearchUser;
  isFollow: boolean;
}

export function SearchUserCard({
  isFollow,
  SearchUserData,
  ...props
}: SearchUserCardProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const followingId = SearchUserData.id;
  console.log(followingId, 'i');
  const followedId = user?.id;
  console.log(followedId, 'il');

  const handleUserClick = (user: SearchUser) => {
    navigate(`/profile/${user.id}`);
  };

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
      await queryClient.invalidateQueries({ queryKey: ['search-users'] });
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
      await queryClient.invalidateQueries({ queryKey: ['search-users'] });
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
      borderColor={'outline'}
      padding={'16px 0'}
      {...props}
    >
      <Avatar
        onClick={() => handleUserClick(SearchUserData)}
        name={SearchUserData.profile.fullname}
        src={
          SearchUserData.profile.avatarUrl ??
          `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${SearchUserData.profile.fullname}`
        }
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'} flex={'7'}>
        <Text fontWeight={'bold'}>{SearchUserData.profile.fullname}</Text>
        <Text color={'secondary'}>@{SearchUserData.username}</Text>

        <Text cursor={'pointer'}>{SearchUserData.profile.bio}</Text>
      </Box>

      <Button
        flex={'1'}
        borderRadius={'full'}
        variant={'outline'}
        border={'1px solid white'}
        onClick={() => {
          if (isFollow) {
            unFollow({ followingId: SearchUserData.id, followedId: user.id });
          } else {
            onFollow({ followingId: SearchUserData.id, followedId: user.id });
          }
        }}
      >
        {isFollow ? 'Unfollow' : 'Follow'}
      </Button>
    </Box>
  );
}
