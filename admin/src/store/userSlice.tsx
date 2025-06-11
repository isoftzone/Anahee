import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  companyid?: string;
  Profession?: string;
  mobile?: string;
  createdon?: string;
  location?: string;
  profileImage?: string;
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserState>) {
      return { ...action.payload }; // correctly replaces state
    },
    logoutUser() {
      return {}; // clears user state
    },
  },
});

export const { setUsers, logoutUser } = userSlice.actions;
export default userSlice.reducer;
