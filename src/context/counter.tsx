import { createContext, useContext, useReducer } from 'react';
import { Actions, ActionType } from './counter-type';

type State = {
  counter: number;
};
type CounterContext = {
  state: State;
  dispatch: React.Dispatch<Actions>;
};

const CounterContext = createContext<CounterContext | null>(null);
const initialState: State = {
  counter: 0,
};

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case ActionType.ADD:
      return { counter: state.counter + 1 };
    case ActionType.SUBTRACT:
      return { counter: state.counter - 1 };
    default:
      throw new Error('gagal cok');
  }
};

export function CounterProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

export function UseUserContext() {
  return useContext(CounterContext);
}
