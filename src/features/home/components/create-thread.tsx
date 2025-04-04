import galleryAddLogo from '@/assets/icons/gallery-add.svg';

import { Avatar } from '@/components/ui/avatar';
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
import { toaster } from '@/components/ui/toaster';
import { ThreadResponse } from '@/features/thread/dto/thread';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import {
  createThreadSchema,
  CreateThreadSchemaDTO,
} from '@/utils/schemas/thread-schema';
import {
  Box,
  Button,
  Field,
  Image,
  Input,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateThread() {
  const {
    user: {
      profile: { avatarUrl, fullname },
    },
  } = useAuthStore();
  const [preview, setPreview] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateThreadSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(createThreadSchema),
  });

  const {
    ref: registerImagesRef,
    onChange: registerImageOnChange,
    ...resRegisterImages
  } = register('images');

  function onClickFile() {
    inputFileRef?.current?.click();
  }

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation<
    ThreadResponse,
    Error,
    CreateThreadSchemaDTO
  >({
    mutationKey: ['threads'],
    mutationFn: async (data: CreateThreadSchemaDTO) => {
      const formData = new FormData();
      formData.append('content', data.content);
      formData.append('images', data.images[0]);

      const response = await api.post<ThreadResponse>('/threads', formData);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }

      toaster.create({
        title: `Something wrong`,
        type: 'error',
      });
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ['threads'],
      });
      toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });

  async function onCreate(data: CreateThreadSchemaDTO) {
    await mutateAsync(data);
    reset();
    setPreview('');
    setIsOpen(false);
  }

  function HandlePreview(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
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
            src={
              avatarUrl ||
              `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${fullname}`
            }
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
                src={
                  avatarUrl ||
                  `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${fullname}`
                }
                shape="full"
                size="full"
                width="40px"
                height="40px"
              />
              <Field.Root invalid={!!errors.content?.message}>
                <Box display={'flex'} flexDirection={'column'}>
                  <Textarea
                    resize="none"
                    border="none"
                    placeholder="What is happening?!"
                    _placeholder={{ fontSize: '16px' }}
                    {...register('content')}
                  />
                  <Image
                    src={preview ?? ''}
                    maxWidth={'300px'}
                    maxHeight={'300px'}
                    objectFit={'contain'}
                    paddingBottom={'10px'}
                  />
                </Box>
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
              onChange={(e) => {
                HandlePreview(e);
                registerImageOnChange(e);
              }}
              hidden
              {...resRegisterImages}
              ref={(e) => {
                registerImagesRef(e);
                inputFileRef.current = e;
              }}
            />
            <Button
              width="63px"
              color="white"
              borderRadius="50px"
              backgroundColor="brand.500"
              fontWeight="bold"
              type="submit"
              loading={isPending}
            >
              {isPending ? <Spinner /> : 'Post'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}
