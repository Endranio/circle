import { postDatas } from '@/utils/dummy/posts';
import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { CardThreadDetail } from '../home/components/card-thread-detail';
import CreateThread from '../home/components/create-thread';
import { CardReply } from '../home/components/card-reply';

export function PostDetail() {
  const { id } = useParams();
  const postData = postDatas.find((post) => post.id === id)!;

  return (
    <Box>
      <CardThreadDetail postData={postData} />
      <CreateThread />
      {postData?.replies?.map((reply) => <CardReply replyData={reply} />)}
    </Box>
  );
}
