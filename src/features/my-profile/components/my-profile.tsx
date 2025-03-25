import { InputImage, LeftArrow } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { toaster } from '@/components/ui/toaster';
import { UserEntity } from '@/entities/user-entity';
import { api } from '@/libs/api';
import {
  updateProfileSchema,
  UpdateProfileSchemaDTO,
} from '@/utils/schemas/profile-schema';
import { userSession } from '@/utils/sesions/sesion';
import {
  Box,
  CloseButton,
  Dialog,
  Heading,
  Image,
  Input,
  Portal,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { List } from './my-profile-list';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth';
import { ProfileResonse } from '@/features/profile/dto/profile';

export function MyProfile(user: UserEntity) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [previewAvatar, setPreviewAvatar] = useState<string | null | undefined>(
    user.profile?.avatarUrl
  );
  const [previewBanner, setPreviewBanner] = useState<string | null | undefined>(
    user.profile?.bannerUrl
  );
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const inputAvatarRef = useRef<HTMLInputElement | null>(null);
  const inputBannerRef = useRef<HTMLInputElement | null>(null);
  const { user: userLogin } = useAuthStore();

  const { data: userdata } = useQuery<UserEntity>({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await api.get(`/users/${id}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (userdata) {
      queryClient.invalidateQueries({ queryKey: ['threads'] });
    }
  }, [userdata]);

  function onBack() {
    navigate('/');
  }

  const { register, handleSubmit } = useForm<UpdateProfileSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(updateProfileSchema),
  });
  const {
    ref: registerAvatarRef,
    onChange: registerAvatarOnChange,
    ...resRegisterAvatar
  } = register('avatarUrl');
  const {
    ref: registerBannerRef,
    onChange: registerBannerOnChange,
    ...resRegisterBanner
  } = register('bannerUrl');

  function onClickBanner() {
    console.log('Input Banner Ref:', inputBannerRef.current);
    inputBannerRef?.current?.click();
  }
  function onClickAvatar() {
    inputAvatarRef?.current?.click();
  }

  const { mutateAsync, isPending } = useMutation<
    ProfileResonse,
    Error,
    UpdateProfileSchemaDTO
  >({
    mutationKey: ['update-profile'],
    mutationFn: async (data: UpdateProfileSchemaDTO) => {
      const formData = new FormData();
      formData.append('fullname', data.fullname);
      formData.append('username', data.username);
      formData.append('bio', data.bio);
      formData.append('bannerUrl', data.bannerUrl[0]);
      formData.append('avatarUrl', data.avatarUrl[0]);

      const response = await api.patch<ProfileResonse>(
        `/users/profile/${id}`,
        formData
      );
      console.log('ini response', response);
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
        queryKey: ['user', id],
      });
      setIsOpen(false);
      toaster.create({
        title: 'Update success',
        type: 'success',
      });
    },
  });

  function HandlePreviewAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreviewAvatar(url);
    }
  }
  function HandlePreviewBanner(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreviewBanner(url);
    }
  }

  async function onUpdate(updateData: UpdateProfileSchemaDTO) {
    console.log('Mengirim data:', updateData);
    await mutateAsync(updateData);
  }

  return (
    <Box>
      <Box display={'flex'} paddingTop={'20px'}>
        <Button
          onClick={onBack}
          variant={'ghost'}
          display={'flex'}
          gap={'4px'}
          color={'secondary'}
        >
          <Image src={LeftArrow} width={'27px'} />
        </Button>
        <Heading fontSize="28px">{userdata?.profile?.fullname}</Heading>
      </Box>

      <Box color="fg.muted">
        <Box
          backgroundSize={'cover'}
          backgroundImage={`url("${userdata?.profile?.bannerUrl}")`}
          width={'100%'}
          height={'140px'}
          borderRadius={'18px'}
        />
        <Box display={'flex'} justifyContent={'space-between'}>
          <Avatar
            marginLeft={'24px'}
            border={'4px solid #1D1D1D'}
            marginTop={'-40px'}
            width={'80px'}
            height={'80px'}
            src={
              userdata?.profile?.avatarUrl ||
              `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${userdata?.profile?.fullname}`
            }
            shape="full"
            size="lg"
          />
          {userLogin.id === userdata?.profile?.userId && (
            <Dialog.Root open={isOpen}>
              <Dialog.Trigger asChild>
                <Button
                  width={'108px'}
                  height={'33px'}
                  borderRadius={'18px'}
                  border={'1px solid white'}
                  variant={'outline'}
                  marginTop={'12px'}
                  onClick={() => {
                    setIsOpen(true);
                    setPreviewAvatar(userdata?.profile?.avatarUrl);
                    setPreviewBanner(userdata?.profile?.bannerUrl);
                  }}
                >
                  Edit Profile
                </Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Dialog.Header>
                        <Dialog.Title width={'100px'}>
                          Edit Profile
                        </Dialog.Title>
                      </Dialog.Header>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton
                          onClick={() => setIsOpen(false)}
                          padding={'20px'}
                          textAlign={'right'}
                          size="xs"
                        />
                      </Dialog.CloseTrigger>
                    </Box>
                    <form onSubmit={handleSubmit(onUpdate)}>
                      <Dialog.Body>
                        <Box color="fg.muted">
                          <Box
                            position="relative"
                            backgroundSize="cover"
                            backgroundImage={`url("${previewBanner}")`}
                            width="100%"
                            height="140px"
                            borderRadius="18px"
                          >
                            <Button
                              onClick={onClickBanner}
                              variant="ghost"
                              position="absolute"
                              top="50%"
                              left="50%"
                              transform="translate(-50%, -50%)"
                              borderRadius="full"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              _hover={{ backgroundColor: 'transparent' }}
                            >
                              <Image src={InputImage} width={'60px'} />
                            </Button>
                            <Input
                              type="file"
                              onChange={(e) => {
                                HandlePreviewBanner(e);
                                registerBannerOnChange(e);
                              }}
                              hidden
                              {...resRegisterBanner}
                              ref={(e) => {
                                registerBannerRef(e);
                                inputBannerRef.current = e;
                              }}
                            />
                          </Box>

                          <Box
                            position="relative"
                            display="flex"
                            marginTop="-40px"
                          >
                            <Box paddingLeft={'32px'} position="relative">
                              <Avatar
                                border="4px solid #1D1D1D"
                                width="80px"
                                height="80px"
                                src={previewAvatar ?? ''}
                                shape="full"
                                size="lg"
                              />

                              <Button
                                onClick={onClickAvatar}
                                variant="ghost"
                                marginTop={'20px'}
                                right={'50%'}
                                _hover={{ backgroundColor: 'transparent' }}
                              >
                                <Image src={InputImage} width="37px" />
                              </Button>
                              <Input
                                type="file"
                                onChange={(e) => {
                                  HandlePreviewAvatar(e);
                                  registerAvatarOnChange(e);
                                }}
                                hidden
                                {...resRegisterAvatar}
                                ref={(e) => {
                                  registerAvatarRef(e);
                                  inputAvatarRef.current = e;
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          gap={'12px'}
                          display={'flex'}
                          flexDirection={'column'}
                          marginTop={'20px'}
                        >
                          <Input
                            placeholder="Name"
                            defaultValue={userdata?.profile?.fullname}
                            {...register('fullname')}
                          ></Input>

                          <Input
                            placeholder="Username"
                            defaultValue={userdata?.username}
                            {...register('username')}
                          ></Input>

                          <Textarea
                            placeholder="Bio"
                            defaultValue={userdata?.profile?.bio || ''}
                            {...register('bio')}
                          ></Textarea>
                        </Box>
                      </Dialog.Body>
                      <Dialog.Footer>
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
          )}
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
          <Text fontSize={'24px'} color={'white'} fontWeight={'700'}>
            {userdata?.profile?.fullname}
          </Text>
          <Text color={'secondary'} fontSize={'14px'}>
            @{userdata?.username}
          </Text>
          <Text color={'white'}>{userdata?.profile?.bio}</Text>
          <Box display={'flex'}>
            <Text
              marginRight={'4px'}
              as={'span'}
              fontWeight={'bold'}
              color={'white'}
            >
              {userSession.followingsCount}
            </Text>
            <Text marginRight={'12px'}>Following</Text>

            <Text
              marginRight={'4px'}
              as={'span'}
              fontWeight={'bold'}
              color={'white'}
            >
              {userSession.followersCount}
            </Text>
            <Text>Followers </Text>
          </Box>
        </Box>
      </Box>
      <Box padding={'12px'}>
        <List />
      </Box>
    </Box>
  );
}
