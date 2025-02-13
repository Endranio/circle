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
import { Avatar } from '../avatar';

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
  return (
    <Box
      width={'563px'}
      height={'100vh'}
      borderLeft={'1px solid'}
      borderColor={'border'}
      padding={'40px'}
      {...props}
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
                backgroundColor={'transparent'}
                border={'1px solid white'}
                color={'white'}
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
    </Box>
  );
}
