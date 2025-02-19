import { Add, Substrack } from '@/stores/slices/slices';
import { RootState } from '@/stores/store';
import { Box, Button, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
export function CounterPage() {
  const { value } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
  return (
    <Box>
      <Text fontSize={'28px'}>{value}</Text>
      <Button onClick={() => dispatch(Add())}>Tambah</Button>
      <Button onClick={() => dispatch(Substrack())}>Kurang</Button>
    </Box>
  );
}
