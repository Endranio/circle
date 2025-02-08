import { ResetPassword } from '@/features/auth/components/reset-password';
import { Box } from '@chakra-ui/react';

export function ResetPage() {
  return (
    <Box display={'flex'} justifyContent={'center'} marginTop={'128px'}>
      <ResetPassword width={'412px'} />
    </Box>
  );
}
