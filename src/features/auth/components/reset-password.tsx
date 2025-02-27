import circlesvg from '@/assets/circle.svg';
import { toaster } from '@/components/ui/toaster';
import { api } from '@/libs/api';
import { ResetPasswordSchemaDTO, resetSchema } from '@/utils/schemas/schema';
import {
  Box,
  BoxProps,
  Button,
  Link as ChakraLink,
  Field,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export function ResetPassword(props: BoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaDTO>({
    mode: 'all',
    resolver: zodResolver(resetSchema),
  });
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  async function OnSubmit({
    oldpassword,
    newpassword,
  }: ResetPasswordSchemaDTO) {
    try {
      const response = await api.post(
        '/auth/reset-password',
        { oldpassword, newpassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        title: `Something wrong`,
        type: 'error',
      });
    }

    navigate({ pathname: '/login' });
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image width="108px" src={circlesvg} />
      <Text fontSize={'28px'}>Forgot password</Text>
      <form
        onSubmit={handleSubmit(OnSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <Field.Root invalid={!!errors['oldpassword']?.message}>
          <Input
            placeholder="New Password*"
            type="password"
            {...register('oldpassword')}
          />
          <Field.ErrorText>{errors['oldpassword']?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors['newpassword']?.message}>
          <Input
            placeholder="Confirm New Password*"
            type="password"
            {...register('newpassword')}
          />
          <Field.ErrorText>{errors['newpassword']?.message}</Field.ErrorText>
        </Field.Root>

        <Button backgroundColor={'brand.500'} color={'white'} type="submit">
          Create New Password
        </Button>
      </form>
      <Text as="span">
        {' '}
        Already have account?{' '}
        <ChakraLink color={'brand.500'} asChild>
          <Link to={'/login'}>Login</Link>
        </ChakraLink>
      </Text>
    </Box>
  );
}
