import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/graphql';

type InitialUserState = {
  user: User | undefined;
};

const initialState: InitialUserState = {
  user: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
