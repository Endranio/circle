import { Home } from '@/features/home/components/home';
import { Box, Text } from '@chakra-ui/react';
export function HomePage() {
  return (
    <Box>
      <Text fontSize={'28px'}>Home</Text>
      <Home />
    </Box>
  );
}
