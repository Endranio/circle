import { Box, Button, Text } from '@chakra-ui/react';
export function CounterPage() {
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <CounterDisplay />
      <CounterPlus />
      <CounterMin />
    </Box>
  );
}

function CounterDisplay() {
  return <Text>{counter}</Text>;
}
function CounterPlus() {
  return <Button onClick={Plus}>TAMBAH</Button>;
}
function CounterMin() {
  return <Button onClick={Min}>KURANG</Button>;
}
