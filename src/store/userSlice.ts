import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../auth/authenticate';

type State = {
  user: User | undefined;
  permissions: string[] | undefined;
  loading: boolean;
};

const initialState: State = {
  user: undefined,
  permissions: undefined,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    authenticateAction: (state) => {
      state.loading = true;
    },
    authenticatedAction: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
      state.loading = false;
    },
    authorizeAction: (state) => {
      state.loading = true;
    },
    authorizedAction: (state, action: PayloadAction<string[] | undefined>) => {
      state.permissions = action.payload;
      state.loading = true;
    },
  },
});

export const { authenticateAction, authenticatedAction, authorizeAction, authorizedAction } =
  userSlice.actions;

export default userSlice.reducer;
