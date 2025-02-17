import circlesvg from '@/assets/circle.svg';
import {
  DumbWays,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Logout,
} from '@/assets/icons';
import { SearchUser } from '@/features/search/type/search-user';
import { NAV_LINK_MENU } from '@/utils/constants/nav-link';
import { SearchUserDatas } from '@/utils/dummy/searchs';
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
import { useReducer } from 'react';
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Avatar } from '../ui/avatar';

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
  const navigate = useNavigate();
  function onBack() {
    navigate('/login');
  }

  return (
    <Box
      width={'417px'}
      height={'auto'}
      padding={'40px'}
      gap={'16px'}
      borderRight={'1px solid'}
      borderColor={'border'}
      display={'flex'}
      flexDirection={'column'}
      {...props}
    >
      <Image width={'220px'} src={circlesvg} padding={'0 20px'} />

      <Box
        display={'flex'}
        flexDirection={'column'}
        marginTop={'23px'}
        gap={'8px'}
        flex={'1'}
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
        <Button
          borderRadius={'full'}
          backgroundColor={'brand.500'}
          color={'white'}
          fontSize={'20px'}
          fontWeight={'600'}
        >
          {' '}
          Create Post
        </Button>
      </Box>
      <Box display={'flex'} gap={'10px'}>
        <Button
          onClick={onBack}
          variant={'ghost'}
          display={'flex'}
          gap={'4px'}
          color={'secondary'}
        >
          <Image src={Logout} width={'27px'} />
        </Button>
        <Text fontSize={'2xl'}>Logout</Text>
      </Box>
    </Box>
  );
}

function RightBar(props: BoxProps) {
  return (
    <Box
      width={'563px'}
      height={'auto'}
      borderLeft={'1px solid'}
      borderColor={'border'}
      padding={'40px'}
      flexDirection={'column'}
      gap={'16px'}
      {...props}
      display={{ base: 'none', lg: 'flex' }}
    >
      <Stack>
        <Card.Root size="sm" backgroundColor={'rightBar'}>
          <Card.Header>
            <Heading fontSize="20px"> My Profile</Heading>
          </Card.Header>
          <Card.Body color="fg.muted" gap={'4px'}>
            <Box
              backgroundSize={'cover'}
              backgroundImage={`url("${userSession.background}")`}
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
          </Card.Body>
        </Card.Root>
      </Stack>
      <Box borderRadius={'lg'} backgroundColor={'rightBar'}>
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

      <Box borderRadius={'lg'} backgroundColor={'rightBar'}>
        <Footer />
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

function Footer() {
  return (
    <Box
      padding={'12px 16px'}
      gap={'10px'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Box display={'flex'}>
        <Text>
          Develop By{' '}
          <Text as="span" fontWeight={'700'}>
            Endranio Palupi
          </Text>{' '}
          •&nbsp;
        </Text>
        <Box display={'flex'} gap={'8px'}>
          <ChakraLink>
            <Image src={Github} />
          </ChakraLink>
          <ChakraLink>
            <Image src={Linkedin} />
          </ChakraLink>
          <ChakraLink>
            <Image src={Facebook} />
          </ChakraLink>
          <ChakraLink>
            <Image src={Instagram} />
          </ChakraLink>
        </Box>
      </Box>
      <Box
        fontSize={'14px'}
        display={'flex'}
        alignItems={'center'}
        color={'footer'}
        gap={2}
      >
        <Text>Powered By</Text>
        <Image height={'16px'} src={DumbWays} />
        <Text>Dumways Indonesia • #1 Coding Bootcamp</Text>
      </Box>
    </Box>
  );
}
