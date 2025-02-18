import { createContext, useContext, useReducer } from 'react';
import { Actions, ActionType } from './authentication-type';

type State = {
  fullname: string;
  email: string;
  username: string;
  adress: string;
};
type AuthContext = {
  state: State;
  dispatch: React.Dispatch<Actions>;
};

const AuthContext = createContext<AuthContext | null>(null);
const initialState: State = {
  fullname: 'test',
  email: 'test@gmail.com',
  username: 'tes',
  adress: 'testsss',
};

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case ActionType.SET_AUTHENTICATION:
      return { ...state, ...action.payload };

    default:
      throw new Error('gagal cok');
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
