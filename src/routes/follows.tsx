import { Follow } from '@/features/follow/followers';
import { Box, Heading } from '@chakra-ui/react';
export function FollowsPage() {
  return (
    <Box>
      <Heading fontSize={'28px'}>Follows</Heading>
      <Follow />
    </Box>
  );
}
