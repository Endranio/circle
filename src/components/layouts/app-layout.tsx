import circlesvg from '@/assets/circle.svg';
import { Logout } from '@/assets/icons';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import { NAV_LINK_MENU } from '@/utils/constants/nav-link';
import { SearchUserDatas } from '@/utils/dummy/searchs';
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
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Avatar } from '../ui/avatar';
import { Footer } from './footer';
import { Suggest } from './suggest';

export function AppLayout() {
  const {
    user: { username },
    setUser,
    logout,
  } = useAuthStore();
  const { isFetched } = useQuery({
    queryKey: ['check'],
    queryFn: async () => {
      try {
        const token = Cookies.get('token');

        const response = await api.post(
          '/auth/check',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.data);
        return response.data;
      } catch {
        Cookies.remove('token');
        logout();
      }
    },
  });

  if (isFetched) {
    if (!username) return <Navigate to={'/login'} />;
    return (
      <Box display={'flex'}>
        <LeftBar />
        <Box width={'748px'} padding={'20px'}>
          <Outlet />
        </Box>
        <RightBar />
      </Box>
    );
  }
}

function LeftBar(props: BoxProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  function onBack() {
    Cookies.remove('token');
    navigate('/login');
  }

  const navLinks = NAV_LINK_MENU();
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
        {navLinks.map(({ path, logo, label }, index) => (
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
          <Text fontSize={'2xl'}>Logout</Text>
        </Button>
      </Box>
    </Box>
  );
}

function RightBar(props: BoxProps) {
  const { pathname } = useLocation();
  const {
    username,
    profile: { fullname, bio, bannerUrl, avatarUrl },
  } = useAuthStore((state) => state.user);

  const { user } = useAuthStore();
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
      {pathname !== `/profile/${user.id}` && (
        <Stack>
          <Card.Root size="sm" backgroundColor={'rightBar'}>
            <Card.Header>
              <Heading fontSize="20px"> My Profile</Heading>
            </Card.Header>
            <Card.Body color="fg.muted" gap={'4px'}>
              <Box
                backgroundSize={'cover'}
                backgroundImage={`url("${bannerUrl}")`}
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
                  src={
                    avatarUrl ||
                    `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${fullname}`
                  }
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
                ></Text>
                <Text marginRight={'12px'}>Following</Text>

                <Text
                  marginRight={'4px'}
                  as={'span'}
                  fontWeight={'bold'}
                  color={'white'}
                ></Text>
                <Text>Followers </Text>
              </Box>
            </Card.Body>
          </Card.Root>
        </Stack>
      )}
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
