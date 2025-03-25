import { SearchUser } from '@/features/search/type/search-user';
import { Box, BoxProps, Button, Text } from '@chakra-ui/react';
import { Avatar } from '../ui/avatar';

interface SearchUserCardProps extends BoxProps {
  SearchUserData: SearchUser;
}

export function Suggest({ SearchUserData }: SearchUserCardProps) {
  // const [, forceUpdate] = useReducer((state) => state + 1, 0);
  return (
    <Box
      display={'flex'}
      gap={'16px'}
      paddingBottom={'16px'}
      borderColor={'outline'}
      paddingX={'24px'}
    >
      <Avatar
        name={SearchUserData.profile.fullname}
        src={SearchUserData.profile.avatarUrl ?? ''}
        shape="full"
        size="full"
        width={'45px'}
      />

      <Box display={'flex'} flexDirection={'column'} flex={'264'}>
        <Text fontWeight={'bold'}>{SearchUserData.profile.fullname}</Text>
        <Text color={'secondary'}>@{SearchUserData.username}</Text>
      </Box>

      <Button
        flex={'99'}
        borderRadius={'full'}
        variant={'outline'}
        border={'1px solid white'}
        marginY={'auto'}
        // onClick={() => {
        //   SearchUserData.uisFollow = !SearchUserData.isFollow;
        //   forceUpdate();
        // }}
      >
        {/* {SearchUserData.isFollow ? 'Unfollow' : 'Follow'} */}
        Follow
      </Button>
    </Box>
  );
}
