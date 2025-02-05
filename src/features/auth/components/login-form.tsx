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

interface LoginFormProps extends BoxProps {
  width?: string;
}

export function LoginForm(props: LoginFormProps) {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image width="108px" src={circlesvg} />
      <Text fontSize={'28px'}>Login to Circle</Text>
      <Field.Root>
        <Input placeholder="Email/Username*" />
        <Field.ErrorText>This is an error text</Field.ErrorText>
      </Field.Root>
      <Field.Root>
        <Input placeholder="Password*" />
        <Field.ErrorText>This is an error text</Field.ErrorText>
      </Field.Root>
      <Text textAlign={'end'} as="span">
        <ChakraLink asChild>
          <Link to={'/forgot-pass'}>Forgot password?</Link>
        </ChakraLink>
      </Text>
      <Button backgroundColor={'brand.500'} color={'white'}>
        Login
      </Button>
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
