import { useNavigate } from 'react-router-dom';
import { Reply } from '../types/posts';
import { Box, BoxProps, Button, Image, Text } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import LikeOutline from '@/assets/icons/like-outline.svg';

interface CardReplyProps extends BoxProps {
  replyData: Reply;
}

export function CardReply({ replyData }: CardReplyProps) {
  const navigate = useNavigate();

  function onClickCard() {
    navigate(`/detail/${replyData.id}`);
  }

  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderBottom={'1px solid'}
      borderColor={'outline'}
      padding={'16px 0'}
    >
      <Avatar
        name={replyData.user.fullname}
        src={replyData.user.avatarUrl}
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
        <Box display={'flex'} gap={'4px'}>
          <Text fontWeight={'bold'}>{replyData.user.fullname}</Text>
          <Text color={'secondary'}>@{replyData.user.username}</Text>
          <Text color={'secondary'}>•</Text>
          <Text color={'secondary'}>{replyData.createdAt.getHours()}h</Text>
        </Box>
        <Text cursor={'pointer'} onClick={onClickCard}>
          {replyData.content}
        </Text>
        <Box display={'flex'}>
          <Button variant={'ghost'} display={'flex'} gap={'4px'}>
            <Image src={LikeOutline} />
            <Text>{replyData.likesCount}</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
