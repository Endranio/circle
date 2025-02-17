import { Avatar } from '@/components/ui/avatar';
import { Box, BoxProps, Button, Text } from '@chakra-ui/react';

import { useReducer } from 'react';
import { SearchUser } from '../search/type/search-user';

interface SearchUserCardProps extends BoxProps {
  SearchUserData: SearchUser;
}

export function Following({ SearchUserData, ...props }: SearchUserCardProps) {
  const [, forceUpdate] = useReducer((state) => state + 1, 0);

  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderColor={'outline'}
      padding={'16px 0'}
      //   justifyContent={"space-between"}
      {...props}
    >
      <Avatar
        name={SearchUserData.fullname}
        src={SearchUserData.avatarUrl}
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'} flex={'7'}>
        <Text fontWeight={'bold'}>{SearchUserData.fullname}</Text>
        <Text color={'secondary'}>@{SearchUserData.username}</Text>

        <Text cursor={'pointer'}>{SearchUserData.bio}</Text>
      </Box>

      <Button
        flex={'1'}
        borderRadius={'full'}
        variant={'outline'}
        border={'1px solid white'}
        marginY={'auto'}
        onClick={() => {
          SearchUserData.isFollow = !SearchUserData.isFollow;
          forceUpdate();
        }}
      >
        {SearchUserData.isFollow ? 'Unfollow' : 'Follow'}
      </Button>
    </Box>
  );
}
