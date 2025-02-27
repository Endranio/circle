import circlesvg from '@/assets/circle.svg';
import { toaster } from '@/components/ui/toaster';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import { loginSchema, LoginSchemaDTO } from '@/utils/schemas/schema';
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
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export function LoginForm(props: BoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const { setUser } = useAuthStore();

  async function OnSubmit(data: LoginSchemaDTO) {
    try {
      const response = await api.post('/auth/login', data);
      setUser(response.data.data.user);
      Cookies.set('token', response.data.data.token, {
        expires: 1,
      });

      toaster.create({
        title: `Login success`,
        type: 'success',
      });

      navigate({ pathname: '/' });
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
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image width="108px" src={circlesvg} />
      <Text fontSize={'28px'}>Login to Circle</Text>
      <form
        onSubmit={handleSubmit(OnSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <Field.Root invalid={!!errors['email']?.message}>
          <Input placeholder="Email*" {...register('email')} />
          <Field.ErrorText>{errors['email']?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors['password']?.message}>
          <Input
            placeholder="Password*"
            type="password"
            {...register('password')}
          />
          <Field.ErrorText>{errors['password']?.message}</Field.ErrorText>
        </Field.Root>
        <Text textAlign={'end'} as="span">
          <ChakraLink asChild>
            <Link to={'/forgot-password'}>Forgot password?</Link>
          </ChakraLink>
        </Text>
        <Button backgroundColor={'brand.500'} color={'white'} type="submit">
          Login
        </Button>
      </form>
      <Text as="span">
        {' '}
        Don't have an account yet?{' '}
        <ChakraLink color={'brand.500'} asChild>
          <Link to={'/register'}>Create account?</Link>
        </ChakraLink>
      </Text>
    </Box>
  );
}
