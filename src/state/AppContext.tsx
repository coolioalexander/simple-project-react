import { Dispatch, createContext, useContext, useReducer, ReactNode } from 'react';
import { User } from './../auth/authenticate';

type State = {
  user: User | undefined;
  permissions: string[] | undefined;
  loading: boolean;
};

type Action =
  | {
      type: 'authenticate';
    }
  | {
      type: 'authenticated';
      user: User | undefined;
    }
  | {
      type: 'authorize';
    }
  | {
      type: 'authorized';
      permissions: string[] | undefined;
    };

type AppContextType = State & {
  dispatch: Dispatch<Action>;
};

type AppProviderType = {
  children: ReactNode;
};

const initialState: State = {
  user: undefined,
  permissions: undefined,
  loading: false,
};

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'authenticate':
      return { ...state, loading: true };
    case 'authenticated':
      return { ...state, user: action.user, loading: false };
    case 'authorize':
      return { ...state, loading: true };
    case 'authorized':
      return { ...state, permissions: action.permissions, loading: false };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType>({ ...initialState, dispatch: () => {} });

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: AppProviderType) => {
  const [{ user, permissions, loading }, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ user, permissions, loading, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
