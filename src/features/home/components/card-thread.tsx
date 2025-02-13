import { useNavigate } from 'react-router-dom';
import { Post } from '../types/posts';
import { Box, BoxProps, Button, Image, Text } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import LikeOutline from '@/assets/icons/like-outline.svg';
import MessageTeks from '@/assets/icons/message-text.svg';
interface CardThreadProps extends BoxProps {
  postData: Post;
}

export function CardThread({ postData }: CardThreadProps) {
  const navigate = useNavigate();

  function onClickCard() {
    navigate(`/detail/${postData.id}`);
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
        name={postData.user.fullname}
        src={postData.user.avatarUrl}
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
        <Box display={'flex'} gap={'4px'}>
          <Text fontWeight={'bold'}>{postData.user.fullname}</Text>
          <Text color={'secondary'}>@{postData.user.username}</Text>
          <Text color={'secondary'}>•</Text>
          <Text color={'secondary'}>{postData.createdAt.getHours()}h</Text>
        </Box>
        <Text cursor={'pointer'} onClick={onClickCard}>
          {postData.content}
        </Text>
        <Box display={'flex'}>
          <Button variant={'ghost'} display={'flex'} gap={'4px'}>
            <Image src={LikeOutline} />
            <Text>{postData.likesCount}</Text>
          </Button>
          <Button variant={'ghost'} display={'flex'} gap={'4px'}>
            <Image src={MessageTeks} />
            <Text>{postData.repliesCount}</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
