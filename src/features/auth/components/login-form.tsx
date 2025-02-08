import circlesvg from '@/assets/circle.svg';
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
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';
import dummyUser from '@/utils/dummy/user.json';

export function LoginForm(props: BoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  async function OnSubmit(data: LoginSchemaDTO) {
    const user = dummyUser.find(
      (dummyUser) => dummyUser.email === watch('email')
    );

    if (!user)
      return toaster.create({
        title: `Email/Password is wrong`,
        type: 'error',
      });

    const isPasswordCorect = user?.password === watch('password');

    if (!isPasswordCorect)
      return toaster.create({
        title: `Email/Password is wrong`,
        type: 'error',
      });

    toaster.create({
      title: `Login success`,
      type: 'success',
    });
    console.log(data);
    navigate({ pathname: '/' });
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
