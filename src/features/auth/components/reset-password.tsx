import circlesvg from '@/assets/circle.svg';
import { toaster } from '@/components/ui/toaster';
import dummyUser from '@/utils/dummy/user.json';
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
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export function ResetPassword(props: BoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordSchemaDTO>({
    mode: 'all',
    resolver: zodResolver(resetSchema),
  });
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  async function OnSubmit(data: ResetPasswordSchemaDTO) {
    const user = dummyUser.find((dummyUser) => dummyUser.email === email);

    if (!user)
      return toaster.create({
        title: `Email not validated`,
        type: 'error',
      });

    if (user.password === watch('password'))
      return toaster.create({
        title: `New password must be different from the old one.`,
        type: 'error',
      });

    toaster.create({
      title: `Reset password success`,
      type: 'success',
    });
    console.log(data);
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
        <Field.Root invalid={!!errors['password']?.message}>
          <Input
            placeholder="New Password*"
            type="password"
            {...register('password')}
          />
          <Field.ErrorText>{errors['password']?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors['confirmPassword']?.message}>
          <Input
            placeholder="Confirm New Password*"
            type="password"
            {...register('confirmPassword')}
          />
          <Field.ErrorText>
            {errors['confirmPassword']?.message}
          </Field.ErrorText>
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
