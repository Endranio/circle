import { LikeLogo, LikeOutline } from '@/assets/icons';
import MessageTeks from '@/assets/icons/message-text.svg';
import { Avatar } from '@/components/ui/avatar';
import { toaster } from '@/components/ui/toaster';
import { ThreadEntity } from '@/entities/thread-entity';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import {
  CreateLikeSchemaDTO,
  DeleteLikeSchemaDTO,
} from '@/utils/schemas/like-schema';
import {
  DeleteThreadSchemaDTO,
  updateThreadSchema,
  UpdateThreadSchemaDTO,
} from '@/utils/schemas/thread-schema';
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  Flex,
  Image,
  Input,
  Portal,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import galleryAddLogo from '@/assets/icons/gallery-add.svg';
import { LikeResponse } from '@/features/like/dto/like-response';
import { ThreadResponse } from '@/features/thread/dto/thread';

export function CardThread(thread: ThreadEntity) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const {
    user: {
      profile: { avatarUrl, fullname },
    },
  } = useAuthStore();
  const [preview, setPreview] = useState<string | null>(thread.images);
  const [content, setContent] = useState<string>(thread.content);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateThreadSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(updateThreadSchema),
  });

  const {
    ref: registerImagesRef,
    onChange: registerImageOnChange,
    ...resRegisterImages
  } = register('images');

  function onClickFile() {
    inputFileRef?.current?.click();
  }

  const { mutateAsync, isPending } = useMutation<
    ThreadResponse,
    Error,
    UpdateThreadSchemaDTO
  >({
    mutationKey: ['update-threads'],
    mutationFn: async (data: UpdateThreadSchemaDTO) => {
      const formData = new FormData();
      formData.append('content', data.content);
      formData.append('images', data.images[0]);

      const response = await api.patch<ThreadResponse>(
        `/threads/${thread.id}`,
        formData
      );
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
      console.log('Update sukses:', data);
      await queryClient.invalidateQueries({
        queryKey: ['threads'],
      });
      setIsOpen(false);
      toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });

  async function onUpdate(data: UpdateThreadSchemaDTO) {
    await mutateAsync(data);
    setPreview(thread.images);
  }

  function HandlePreview(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }

  function onClickCard() {
    navigate(`/detail/${thread.id}`);
  }

  const { mutateAsync: mutateDelete } = useMutation<
    ThreadResponse,
    Error,
    DeleteThreadSchemaDTO
  >({
    mutationKey: ['deleteThread'],
    mutationFn: async (data: DeleteThreadSchemaDTO) => {
      const response = await api.delete<ThreadResponse>(`/threads/${data.id}`);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
      toaster.create({ title: `Something went wrong`, type: 'error' });
    },
    onSuccess: async () => {
      toaster.create({ title: 'Thread deleted', type: 'success' });
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
  });

  const { isPending: isPendingUnlike, mutateAsync: mutateLike } = useMutation<
    LikeResponse,
    Error,
    CreateLikeSchemaDTO
  >({
    mutationKey: ['Likes'],
    mutationFn: async (data: CreateLikeSchemaDTO) => {
      const response = await api.post<LikeResponse>('/likes/thread', data);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
      toaster.create({ title: `Something went wrong`, type: 'error' });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
  });

  const { isPending: isPendingLike, mutateAsync: mutateUnlike } = useMutation<
    LikeResponse,
    Error,
    DeleteLikeSchemaDTO
  >({
    mutationKey: ['Unlike'],
    mutationFn: async (data: DeleteLikeSchemaDTO) => {
      const response = await api.delete<LikeResponse>(
        `/likes/thread/${data.threadId}`
      );
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }
      toaster.create({ title: 'Something went wrong!', type: 'error' });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
  });

  async function OnLike(data: CreateLikeSchemaDTO) {
    await mutateLike(data);
  }

  async function OnUnlike(data: DeleteLikeSchemaDTO) {
    await mutateUnlike(data);
  }

  async function DeleteThread(data: DeleteThreadSchemaDTO) {
    await mutateDelete(data);
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
        name={thread.user?.profile?.fullname}
        src={
          thread.user?.profile?.avatarUrl ||
          `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${thread.user?.profile?.fullname}`
        }
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'} width={'100%'}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Flex gap={'4px'} alignItems={'center'}>
            <Text fontWeight={'bold'}>{thread.user?.profile?.fullname}</Text>
            <Text color={'secondary'}>@{thread.user?.username}</Text>
            <Text color={'secondary'}>•</Text>
            <Text color={'secondary'}>
              {new Date(thread.createdAt).getHours()}h
            </Text>
          </Flex>
          {user.id === thread.userId && (
            <Flex gap={'8px'}>
              <Dialog.Root open={isOpen}>
                <Dialog.Trigger asChild>
                  <Button
                    variant={'ghost'}
                    size={'sm'}
                    onClick={() => {
                      setIsOpen(true);
                      setContent(thread.content);
                      setPreview(thread.images);
                    }}
                  >
                    Edit
                  </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton
                          width={'10px'}
                          textAlign={'right'}
                          size="sm"
                          position="absolute"
                          top="2"
                          insetEnd="2"
                          onClick={() => setIsOpen(false)}
                        />
                      </Dialog.CloseTrigger>
                      <form onSubmit={handleSubmit(onUpdate)}>
                        <Dialog.Body marginTop={'30px'}>
                          <Box
                            borderBottom="2px solid #1D1D1D"
                            display="flex"
                            gap="20px"
                          >
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
                                  defaultValue={content}
                                />
                                <Image
                                  src={preview ?? ''}
                                  maxWidth={'300px'}
                                  maxHeight={'300px'}
                                  objectFit={'contain'}
                                  paddingBottom={'10px'}
                                />
                              </Box>
                              <Field.ErrorText>
                                {errors.content?.message}
                              </Field.ErrorText>
                            </Field.Root>
                          </Box>
                        </Dialog.Body>
                        <Dialog.Footer>
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
                            {isPending ? <Spinner /> : 'Save'}
                          </Button>
                        </Dialog.Footer>
                      </form>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
              <Button
                onClick={() => DeleteThread({ id: thread.id })}
                variant={'ghost'}
                size={'sm'}
              >
                Delete
              </Button>
            </Flex>
          )}
        </Flex>

        <Text cursor={'pointer'} onClick={onClickCard}>
          {thread.content}
        </Text>

        {thread.images && (
          <Image
            onClick={onClickCard}
            src={thread.images}
            maxWidth={'100%'}
            maxHeight={'300px'}
            objectFit={'contain'}
            borderRadius={'8px'}
            mt={'8px'}
          />
        )}

        <Flex gap={'16px'} mt={'8px'}>
          <Button
            variant={'ghost'}
            display={'flex'}
            gap={'4px'}
            disabled={isPendingLike || isPendingUnlike}
            onClick={() =>
              thread.isLike
                ? OnUnlike({ threadId: thread.id })
                : OnLike({ threadId: thread.id })
            }
          >
            <Image src={thread.isLike ? LikeLogo : LikeOutline} />
            <Text>{thread.likesCount} Like</Text>
          </Button>
          <Button variant={'ghost'} display={'flex'} gap={'4px'}>
            <Image src={MessageTeks} />
            <Text>{thread.repliesCount} Replies</Text>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
