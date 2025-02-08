import {
  Input,
  Field,
  Image,
  Text,
  Box,
  Link as ChakraLink,
  Button,
  BoxProps,
} from '@chakra-ui/react';
import circlesvg from '@/assets/circle.svg';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerSchema, RegisterSchemaDTO } from '@/utils/schemas/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';

export function RegisterForm(props: BoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  async function OnSubmit(data: RegisterSchemaDTO) {
    toaster.create({
      title: `Login success`,
      type: 'success',
    });

    console.log(data);

    navigate({ pathname: '/login' });
  }
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image width="108px" src={circlesvg} />
      <Text fontSize={'28px'}>Create account Circle</Text>
      <form
        onSubmit={handleSubmit(OnSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <Field.Root invalid={!!errors['fullName']?.message}>
          <Input placeholder="Fullname*" {...register('fullName')} />
          <Field.ErrorText>{errors['fullName']?.message}</Field.ErrorText>
        </Field.Root>
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

        <Button backgroundColor={'brand.500'} color={'white'} type="submit">
          Register
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
