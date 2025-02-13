import { Box, Button, Image, Text } from '@chakra-ui/react';
import { PostDetail } from '@/features/thread-detail/thread-detail';
import arrowLeft from '@/assets/icons/Line arrow-left.svg';
import { useNavigate } from 'react-router-dom';

export default function ThreadDetailPage() {
  const navigate = useNavigate();

  function onBack() {
    navigate('/');
  }

  return (
    <Box>
      <Box display={'flex'} gap={'10px'}>
        <Button
          onClick={onBack}
          variant={'ghost'}
          display={'flex'}
          gap={'4px'}
          color={'secondary'}
        >
          <Image src={arrowLeft} width={'27px'} />
        </Button>
        <Text fontSize={'2xl'}>Status</Text>
      </Box>
      <PostDetail />
    </Box>
  );
}
