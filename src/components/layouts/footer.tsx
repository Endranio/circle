import {
  DumbWays,
  Facebook,
  Github,
  Instagram,
  Linkedin,
} from '@/assets/icons';
import { Box, Link as ChakraLink, Image, Text } from '@chakra-ui/react';

export function Footer() {
  return (
    <Box
      padding={'10px 14px'}
      gap={'8px'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Box display={'flex'}>
        <Text fontSize={'13px'}>
          Develop By{' '}
          <Text as="span" fontWeight={'700'}>
            Endranio Palupi
          </Text>{' '}
          •&nbsp;
        </Text>
        <Box display={'flex'} gap={'8px'}>
          <ChakraLink>
            <Image boxSize="20px" src={Github} />
          </ChakraLink>
          <ChakraLink>
            <Image boxSize="16px" src={Linkedin} />
          </ChakraLink>
          <ChakraLink>
            <Image boxSize="16px" src={Facebook} />
          </ChakraLink>
          <ChakraLink>
            <Image boxSize="16px" src={Instagram} />
          </ChakraLink>
        </Box>
      </Box>
      <Box
        fontSize={'14px'}
        display={'flex'}
        alignItems={'center'}
        color={'footer'}
        gap={2}
      >
        <Text fontSize={'9px'}>Powered By</Text>
        <Image align={'center'} height={'13px'} src={DumbWays} />
        <Text fontSize={'9px'}>Dumways Indonesia • #1 Coding Bootcamp</Text>
      </Box>
    </Box>
  );
}
