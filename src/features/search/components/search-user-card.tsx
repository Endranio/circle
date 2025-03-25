import { Avatar } from '@/components/ui/avatar';
import { Box, BoxProps, Button, Text } from '@chakra-ui/react';
import { SearchUser } from '../type/search-user';
import { useNavigate } from 'react-router-dom';

interface SearchUserCardProps extends BoxProps {
  SearchUserData: SearchUser;
}

export function SearchUserCard({
  SearchUserData,
  ...props
}: SearchUserCardProps) {
  const navigate = useNavigate();

  const handleUserClick = (user: SearchUser) => {
    navigate(`/profile/${user.id}`);
  };

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
        marginY={'auto'}
        onClick={() => {
          // SearchUserData.isFollow = !SearchUserData.isFollow;
          //   forceUpdate();
        }}
      >
        {/* {SearchUserData.isFollow ? 'Unfollow' : 'Follow'} */}
        Follow
      </Button>
    </Box>
  );
}
