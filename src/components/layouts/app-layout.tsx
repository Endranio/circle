import circlesvg from '@/assets/circle.svg';
import { NAV_LINK_MENU } from '@/utils/constants/nav-link';
import { IsLogin, userSession } from '@/utils/sesions/sesion';
import {
  Box,
  BoxProps,
  Button,
  Card,
  Link as ChakraLink,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Avatar } from '../ui/avatar';
import { useReducer } from 'react';
import { SearchUser } from '@/features/search/type/search-user';
import { SearchUserDatas } from '@/utils/dummy/searchs';
import { useAuthContext } from '@/context/authentication/authentication';
import { ActionType } from '@/context/authentication/authentication-type';

export function AppLayout() {
  if (!IsLogin) return <Navigate to={'/login'} />;

  return (
    <Box display={'flex'}>
      <LeftBar />
      <Box width={'748px'} padding={'40px'}>
        <Outlet />
      </Box>
      <RightBar />
    </Box>
  );
}

function LeftBar(props: BoxProps) {
  const { pathname } = useLocation();
  return (
    <Box
      width={'417px'}
      height={'100vh'}
      padding={'40px'}
      gap={'16px'}
      borderRight={'1px solid'}
      borderColor={'border'}
      {...props}
    >
      <Image width={'220px'} src={circlesvg} padding={'0 20px'} />
      <Box
        display={'flex'}
        flexDirection={'column'}
        marginTop={'23px'}
        gap={'8px'}
      >
        {NAV_LINK_MENU.map(({ path, logo, label }, index) => (
          <ChakraLink
            asChild
            gap={'16px'}
            display={'flex'}
            alignItems={'center'}
            padding={'16px 20px'}
            key={index}
          >
            <Link to={path}>
              <Image
                src={pathname === path ? logo.full : logo.outline}
                width={'27px'}
              />
              <Text fontSize={'18px'} lineHeight={'24px'}>
                {label}
              </Text>
            </Link>
          </ChakraLink>
        ))}
      </Box>
    </Box>
  );
}

function RightBar(props: BoxProps) {
  const { avatarUrl, background, followersCount, followingsCount, bio } =
    userSession;

  const {
    state: { adress, email, fullname, username },
    dispatch,
  } = useAuthContext()!;

  return (
    <Box
      width={'563px'}
      height={'100vh'}
      borderLeft={'1px solid'}
      borderColor={'border'}
      padding={'40px'}
      {...props}
      display={{ base: 'none', lg: 'block' }}
    >
      <Stack>
        <Card.Root size="sm" backgroundColor={'rightBar'}>
          <Card.Header>
            <Heading fontSize="20px"> My Profile</Heading>
          </Card.Header>
          <Card.Body color="fg.muted" gap={'4px'}>
            <Box
              backgroundSize={'cover'}
              backgroundImage={`url("${background}")`}
              width={'100%'}
              height={'100px'}
              borderRadius={'18px'}
            />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Avatar
                marginLeft={'24px'}
                border={'4px solid #1D1D1D'}
                marginTop={'-40px'}
                width={'80px'}
                height={'80px'}
                src={avatarUrl}
                shape="full"
                size="lg"
              />
              <Text>{adress}</Text>
              <Text>{email}</Text>
              <Text>{fullname}</Text>
              <Text>{username}</Text>

              <Button
                onClick={() => {
                  dispatch({
                    type: ActionType.SET_AUTHENTICATION,
                    payload: {
                      email: 'berhasil@gmail.com',
                      adress: 'berubah',
                      fullname: 'ganti',
                      username: 'jaya',
                    },
                  });
                }}
              >
                Ubah
              </Button>
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
            <Text fontSize={'24px'} color={'white'} fontWeight={'700'}>
              {fullname}
            </Text>
            <Text color={'secondary'} fontSize={'14px'}>
              @{username}
            </Text>
            <Text color={'white'}>{bio}</Text>
            <Box display={'flex'}>
              <Text
                marginRight={'4px'}
                as={'span'}
                fontWeight={'bold'}
                color={'white'}
              >
                {followingsCount}
              </Text>
              <Text marginRight={'12px'}>Following</Text>

              <Text
                marginRight={'4px'}
                as={'span'}
                fontWeight={'bold'}
                color={'white'}
              >
                {followersCount}
              </Text>
              <Text>Followers </Text>
            </Box>
          </Card.Body>
        </Card.Root>
      </Stack>
      <Box
        marginTop={'16px'}
        borderRadius={'18px'}
        backgroundColor={'rightBar'}
      >
        <Heading
          fontSize="20px"
          lineHeight={'28px'}
          padding={'16px 0 10px 24px'}
        >
          {' '}
          Suggested Users{' '}
        </Heading>
        {SearchUserDatas.slice(0, 5).map((SearchUserData) => (
          <Suggest key={SearchUserData.id} SearchUserData={SearchUserData} />
        ))}
      </Box>
    </Box>
  );
}

interface SearchUserCardProps extends BoxProps {
  SearchUserData: SearchUser;
}

function Suggest({ SearchUserData }: SearchUserCardProps) {
  const [, forceUpdate] = useReducer((state) => state + 1, 0);
  return (
    <Box
      display={'flex'}
      gap={'16px'}
      paddingBottom={'16px'}
      borderColor={'outline'}
      paddingX={'24px'}
    >
      <Avatar
        name={SearchUserData.fullname}
        src={SearchUserData.avatarUrl}
        shape="full"
        size="full"
        width={'45px'}
      />

      <Box display={'flex'} flexDirection={'column'} flex={'264'}>
        <Text fontWeight={'bold'}>{SearchUserData.fullname}</Text>
        <Text color={'secondary'}>@{SearchUserData.username}</Text>
      </Box>

      <Button
        flex={'99'}
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
