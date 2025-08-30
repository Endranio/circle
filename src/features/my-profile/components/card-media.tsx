import { ThreadEntity } from '@/entities/thread-entity';
import { Box, Image } from '@chakra-ui/react';

export function CardMedia(thread: ThreadEntity) {
  return (
    <Box
      display={'flex'}
      borderColor={'outline'}
      padding={'2px'}
      width={'100%'}
    >
      {thread.images && (
        <Image src={thread.images} maxWidth={'100%'} objectFit={'contain'} />
      )}
    </Box>
  );
}
