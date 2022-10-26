import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import sportsTeamList from 'utils/dataUtils'

const teamListSlice = createSlice({
  name: 'teamList',
  initialState: { sportsTeamList: sportsTeamList },
  reducers: {
    getList: (state, action) => { 
      state.sportsTeamList = [sportsTeamList];
    },
  },
});

export const { getList } = teamListSlice.actions;
export default teamListSlice.reducer;
