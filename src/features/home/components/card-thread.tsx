import { useNavigate } from 'react-router-dom';
import { Post } from '../types/posts';
import { Box, BoxProps, Button, Image, Text } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';
import { LikeLogo, LikeOutline } from '@/assets/icons';
import MessageTeks from '@/assets/icons/message-text.svg';
import { useReducer } from 'react';
interface CardThreadProps extends BoxProps {
  postData: Post;
}

export function CardThread({ postData }: CardThreadProps) {
  const navigate = useNavigate();
  const [, forceUpdate] = useReducer((state) => state + 1, 0);
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
          <Text color={'secondary'}>
            {new Date(postData.createdAt).getHours()}h
          </Text>
        </Box>

        <Text cursor={'pointer'} onClick={onClickCard}>
          {postData.content}
        </Text>
        <Image
          src={postData.images}
          maxWidth={'300px'}
          maxHeight={'300px'}
          objectFit={'contain'}
        />
        <Box display={'flex'}>
          <Button
            variant={'ghost'}
            display={'flex'}
            gap={'4px'}
            onClick={() => {
              postData.isLike = !postData.isLike;
              forceUpdate();
            }}
          >
            <Image src={postData.isLike ? LikeLogo : LikeOutline} />
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
