import { Box, Button, Text } from '@chakra-ui/react';
import { test2 } from '@/store/zustand';
export function Counter() {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <CounterDisplay />
      <CounterPlus />
      <CounterMin />
    </Box>
  );
}

function CounterDisplay() {
  const { counter } = test2((state) => state);

  return <Text>{counter}</Text>;
}
function CounterPlus() {
  const Plus = test2((state) => state.plus);
  return <Button onClick={Plus}>TAMBAH</Button>;
}
function CounterMin() {
  const Min = test2((state) => state.min);
  return <Button onClick={Min}>KURANG</Button>;
}
