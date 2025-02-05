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

interface RegisterFormProps extends BoxProps {
  width?: string;
}

export function RegisterForm(props: RegisterFormProps) {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image width="108px" src={circlesvg} />
      <Text fontSize={'28px'}>Create account Circle</Text>
      <Field.Root>
        <Input placeholder="Fullname*" />
        <Field.ErrorText>This is an error text</Field.ErrorText>
      </Field.Root>
      <Field.Root>
        <Input placeholder="Email*" />
        <Field.ErrorText>This is an error text</Field.ErrorText>
      </Field.Root>

      <Field.Root>
        <Input placeholder="Password*" />
        <Field.ErrorText>This is an error text</Field.ErrorText>
      </Field.Root>

      <Button backgroundColor={'brand.500'} color={'white'}>
        Register
      </Button>
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
