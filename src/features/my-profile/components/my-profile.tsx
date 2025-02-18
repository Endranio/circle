import { LeftArrow } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { userSession } from '@/utils/sesions/sesion';
import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { List } from './my-profile-list';

export function MyProfile() {
  const navigate = useNavigate();

  function onBack() {
    navigate('/');
  }

  return (
    <Box>
      <Box display={'flex'} paddingTop={'20px'}>
        <Button
          onClick={onBack}
          variant={'ghost'}
          display={'flex'}
          gap={'4px'}
          color={'secondary'}
        >
          <Image src={LeftArrow} width={'27px'} />
        </Button>
        <Heading fontSize="28px">{userSession.fullname}</Heading>
      </Box>

      <Box color="fg.muted">
        <Box
          backgroundSize={'cover'}
          backgroundImage={`url("${userSession.background}")`}
          width={'100%'}
          height={'140px'}
          borderRadius={'18px'}
        />
        <Box display={'flex'} justifyContent={'space-between'}>
          <Avatar
            marginLeft={'24px'}
            border={'4px solid #1D1D1D'}
            marginTop={'-40px'}
            width={'80px'}
            height={'80px'}
            src={userSession.avatarUrl}
            shape="full"
            size="lg"
          />
          <Button
            width={'108px'}
            height={'33px'}
            borderRadius={'18px'}
            border={'1px solid white'}
            variant={'outline'}
            marginTop={'12px'}
          >
            Edit Profile
          </Button>
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
          <Text fontSize={'24px'} color={'white'} fontWeight={'700'}>
            {userSession.fullname}
          </Text>
          <Text color={'secondary'} fontSize={'14px'}>
            @{userSession.username}
          </Text>
          <Text color={'white'}>{userSession.bio}</Text>
          <Box display={'flex'}>
            <Text
              marginRight={'4px'}
              as={'span'}
              fontWeight={'bold'}
              color={'white'}
            >
              {userSession.followingsCount}
            </Text>
            <Text marginRight={'12px'}>Following</Text>

            <Text
              marginRight={'4px'}
              as={'span'}
              fontWeight={'bold'}
              color={'white'}
            >
              {userSession.followersCount}
            </Text>
            <Text>Followers </Text>
          </Box>
        </Box>
      </Box>
      <Box padding={'12px'}>
        <List />
      </Box>
    </Box>
  );
}
