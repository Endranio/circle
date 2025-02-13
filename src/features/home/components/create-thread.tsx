import galleryAddLogo from '@/assets/icons/gallery-add.svg';
import { Avatar } from '@/components/ui/avatar';
import { userSession } from '@/utils/sesions/sesion';
import { Box, Button, Image, Input, Text, Textarea } from '@chakra-ui/react';
import { useRef } from 'react';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function CreateThread() {
  const { fullname, avatarUrl } = userSession;
  const inputFileRef = useRef<HTMLInputElement>(null);

  function onClickFile() {
    inputFileRef?.current?.click();
  }

  return (
    <DialogRoot>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'20px'}
        borderBottom={'1px solid'}
        borderBottomColor={'outline'}
        padding={'20px 0px'}
        justifyContent={'space-between'}
      >
        <Box display={'flex'} alignItems={'center'} gap={'20px'}>
          <Avatar
            name={fullname}
            src={avatarUrl}
            shape="full"
            size="full"
            width={'50px'}
            height={'50px'}
          />
          <DialogTrigger asChild>
            <Text fontSize={'20px'} color={'secondary'}>
              "What is happening?!"
            </Text>
          </DialogTrigger>
        </Box>
        <Box>
          <Button
            variant={'ghost'}
            onClick={onClickFile}
            disabled
            cursor={'disabled'}
          >
            <Image src={galleryAddLogo} width={'27px'} />
          </Button>
          <Input type={'file'} hidden ref={inputFileRef} />

          <Button
            width={'63px'}
            color={'white'}
            borderRadius={'50px'}
            backgroundColor={'brand.500'}
            fontWeight={'bold'}
            disabled
          >
            Post
          </Button>
        </Box>
      </Box>
      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <DialogBody>
          <Box borderBottom={'2px solid #1D1D1D'} display={'flex'} gap={'20px'}>
            <Avatar
              name={fullname}
              src={avatarUrl}
              shape="full"
              size="full"
              width={'40px'}
              height={'40px'}
            />
            <Textarea
              height={'140px'}
              resize={'none'}
              border={'none'}
              placeholder="What is happening?!"
              _placeholder={{ fontSize: '24px', lineHeight: '32px' }}
            />
          </Box>
        </DialogBody>
        <DialogFooter display={'flex'} justifyContent={'space-between'}>
          <Button variant={'ghost'} onClick={onClickFile}>
            <Image src={galleryAddLogo} width={'27px'} />
          </Button>
          <Input type={'file'} hidden ref={inputFileRef} />

          <Button
            width={'63px'}
            color={'white'}
            borderRadius={'50px'}
            backgroundColor={'brand.500'}
            fontWeight={'bold'}
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
