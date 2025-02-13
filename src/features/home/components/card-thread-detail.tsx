import MessageText from '@/assets/icons/message-text.svg';
import { Avatar } from '@/components/ui/avatar';
import { formatDate } from '@/utils/format-date';
import { Box, BoxProps, Button, Image, Text } from '@chakra-ui/react';
import { Post } from '../types/posts';

interface CardThreadDetailProps extends BoxProps {
  postData: Post;
}

export function CardThreadDetail({ postData }: CardThreadDetailProps) {
  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderBottom={'1px solid'}
      borderColor={'outline'}
      padding={'16px 0'}
    >
      <Box>
        <Avatar
          name={postData.user.fullname}
          src={postData.user.avatarUrl}
          shape="full"
          size="full"
          width={'50px'}
          height={'50px'}
        />
      </Box>

      <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
        <Box display={'flex'} gap={'4px'}>
          <Text fontWeight={'bold'}>{postData.user.fullname}</Text>
          <Text color={'secondary'}>@{postData.user.username}</Text>
        </Box>
        <Box>
          <Text>{postData.content}</Text>
          <Text>{formatDate(postData.createdAt)}</Text>
        </Box>
        <Box display={'flex'}>
          <Button variant={'ghost'} display={'flex'} gap={'4px'}>
            <Image src={MessageText} />
            <Text>{postData.repliesCount}</Text>
            <Text>Replies</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
