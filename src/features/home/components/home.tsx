import { Box } from '@chakra-ui/react';
import CreateThread from './create-thread';
import { CardThread } from './card-thread';
import { postDatas } from '@/utils/dummy/posts';

export function Home() {
  return (
    <Box>
      <CreateThread />
      <Box>
        {postDatas.map((postData) => (
          <CardThread postData={postData} key={postData.id} />
        ))}
      </Box>
    </Box>
  );
}
