import { Box, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';

export function Counter() {
  const [counter, setCounter] = useState<number>(0);

  function Plus() {
    setCounter(counter + 1);
  }

  function Min() {
    setCounter(counter - 1);
  }

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <CounterDisplay counter={counter} />
      <CounterPlus Plus={Plus} />
      <CounterMin Min={Min} />
    </Box>
  );
}

function CounterDisplay({ counter }: { counter: number }) {
  return <Text>{counter}</Text>;
}
function CounterPlus({ Plus }: { Plus(): void }) {
  return <Button onClick={Plus}>TAMBAH</Button>;
}
function CounterMin({ Min }: { Min(): void }) {
  return <Button onClick={Min}>KURANG</Button>;
}
