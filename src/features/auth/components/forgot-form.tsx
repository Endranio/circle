import circlesvg from '@/assets/circle.svg';
import { toaster } from '@/components/ui/toaster';
import { api } from '@/libs/api';
import { ForgotPasswordSchemaDTO, forgotSchema } from '@/utils/schemas/schema';
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
import { Link } from 'react-router-dom';

export function ForgotPassword(props: BoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(forgotSchema),
  });

  async function OnSubmit({ email }: ForgotPasswordSchemaDTO) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
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
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image width="108px" src={circlesvg} />
      <Text fontSize={'28px'}>Forgot password</Text>
      <form
        onSubmit={handleSubmit(OnSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <Field.Root invalid={!!errors['email']?.message}>
          <Input placeholder="Email*" {...register('email')} />
          <Field.ErrorText>{errors['email']?.message}</Field.ErrorText>
        </Field.Root>

        <Button backgroundColor={'brand.500'} color={'white'} type="submit">
          Send
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
