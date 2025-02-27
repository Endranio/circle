import galleryAddLogo from '@/assets/icons/gallery-add.svg';
import { Avatar } from '@/components/ui/avatar';
import { userSession } from '@/utils/sesions/sesion';
import {
  Box,
  Button,
  Field,
  Image,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
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
import {
  createThreadSchema,
  CreateThreadSchemaDTO,
} from '@/utils/schemas/thread-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { api } from '@/libs/api';
import { toaster } from '@/components/ui/toaster';

export default function CreateThread() {
  const { fullname, avatarUrl } = userSession;
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateThreadSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(createThreadSchema),
  });

  const { ref: registerImagesRef, ...resRegisterImages } = register('images');

  function onClickFile() {
    inputFileRef?.current?.click();
  }

  async function onCreate(data: CreateThreadSchemaDTO) {
    console.log('ini dia', data);
    setIsOpen(false);

    try {
      const formData = new FormData();
      formData.append('content', data.content);
      formData.append('images', data.images[0]);

      const response = await api.post('/threads', formData);

      toaster.create({
        title: response.data.message,
        type: 'success',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }

      toaster.create({
        title: 'Terjadi kesalahan',
        type: 'error',
      });
    }
  }

  return (
    <DialogRoot open={isOpen}>
      <Box
        display="flex"
        alignItems="center"
        gap="20px"
        borderBottom="1px solid"
        borderBottomColor="outline"
        padding="20px 0px"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" gap="20px">
          <Avatar
            name={fullname}
            src={avatarUrl}
            shape="full"
            size="full"
            width="50px"
            height="50px"
          />
          <DialogTrigger asChild>
            <Text
              fontSize="20px"
              color="secondary"
              onClick={() => setIsOpen(true)}
            >
              "What is happening?!"
            </Text>
          </DialogTrigger>
        </Box>
        <Box>
          <Button
            variant="ghost"
            onClick={onClickFile}
            disabled
            cursor="disabled"
          >
            <Image src={galleryAddLogo} width="27px" />
          </Button>
          <Input type="file" hidden ref={inputFileRef} />
          <Button
            width="63px"
            color="white"
            borderRadius="50px"
            backgroundColor="brand.500"
            fontWeight="bold"
            disabled
          >
            Post
          </Button>
        </Box>
      </Box>

      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger
          onClick={() => setIsOpen(false)}
        ></DialogCloseTrigger>

        <DialogHeader>
          <DialogTitle />
        </DialogHeader>

        <form onSubmit={handleSubmit(onCreate)}>
          <DialogBody>
            <Box borderBottom="2px solid #1D1D1D" display="flex" gap="20px">
              <Avatar
                name={fullname}
                src={avatarUrl}
                shape="full"
                size="full"
                width="40px"
                height="40px"
              />
              <Field.Root invalid={!!errors.content?.message}>
                <Textarea
                  height="140px"
                  resize="none"
                  border="none"
                  placeholder="What is happening?!"
                  _placeholder={{ fontSize: '24px', lineHeight: '32px' }}
                  {...register('content')}
                />
                <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
              </Field.Root>
            </Box>
          </DialogBody>

          <DialogFooter display="flex" justifyContent="space-between">
            <Button variant="ghost" onClick={onClickFile}>
              <Image src={galleryAddLogo} width="27px" />
            </Button>
            <Input
              type="file"
              {...resRegisterImages}
              hidden
              ref={(e) => {
                registerImagesRef(e);
                inputFileRef.current = e;
              }}
              multiple
            />
            <Button
              width="63px"
              color="white"
              borderRadius="50px"
              backgroundColor="brand.500"
              fontWeight="bold"
              type="submit"
            >
              Post
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}
