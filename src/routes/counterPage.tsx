import { Box, Button, Text } from '@chakra-ui/react';

import { useCounterContext } from '@/context/counter';
import { ActionType } from '@/context/counter-type';
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
  const { state } = useCounterContext()!;

  return <Text>{state.counter}</Text>;
}
function CounterPlus() {
  const { dispatch } = useCounterContext()!;

  return (
    <Button
      onClick={() => {
        dispatch({ type: ActionType.ADD });
      }}
    >
      TAMBAH
    </Button>
  );
}
function CounterMin() {
  const { dispatch } = useCounterContext()!;
  return (
    <Button
      onClick={() => {
        dispatch({ type: ActionType.SUBTRACT });
      }}
    >
      KURANG
    </Button>
  );
}
