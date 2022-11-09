import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import sportsTeamList from 'utils/dataUtils'
const topLeague = [
  { m_icon: 'assets/images/micons/champions_league1.png', type: 'CHAMPIONS LEAGUE' },
  { m_icon: 'assets/images/micons/europe_league.png', type: 'EUROPA LEAGUE' },
  { m_icon: 'assets/images/micons/premier_league.png', type: 'PREMIER LEAGUE' },
  { m_icon: 'assets/images/micons/la_liga.png', type: 'LA LIGA' },
  { m_icon: 'assets/images/micons/bundesliga.png', type: '1.BUNDESLIGA' },
  { m_icon: 'assets/images/micons/serie_a.png', type: 'SERIE A' },
  { m_icon: 'assets/images/micons/league_1.png', type: 'LEAGUE 1' },
  { m_icon: 'assets/images/micons/super_lig.png', type: 'SUPER LIG' },
  { m_icon: 'assets/images/micons/eredivisie.png', type: 'EREDIVISIE' },
  { m_icon: 'assets/images/micons/liga_portugal.png', type: 'LIGA PORTUGAL' },
  { m_icon: '', type: 'World Cup Group A' },
  { m_icon: '', type: 'World Cup Group B' },
  { m_icon: '', type: 'World Cup Group C' },
  { m_icon: '', type: 'World Cup Group D' },
  { m_icon: '', type: 'World Cup Group E' },
  { m_icon: '', type: 'World Cup Group F' },
  { m_icon: '', type: 'World Cup Group G' },
  { m_icon: '', type: 'World Cup Group H' },
]

export const getAllMatches = createAsyncThunk('teamList/getAllMatches', async () => {
  const response = await axios.get('/user/getAllMatches');
  const data = await response.data;
  return data;
});
export const getMatches = createAsyncThunk('teamList/getMatches', async () => {
  const response = await axios.get('/user/getMatches');
  const data = await response.data;
  return data;
});

const teamListSlice = createSlice({
  name: 'teamList',
  initialState: { sportsTeamList: [], topLeague: [] },
  reducers: {
    getTypeList: (state, action) => { 
      // console.log('getTypeList ->', action);
      state.sportsTeamList = [...sportsTeamList];
    },
    getTopLeague: (state, action) => {
      // console.log('getTopLeague ->', action);
      state.topLeague = topLeague;
    },
  },
  extraReducers: {
    [getAllMatches.fulfilled]: (state, action) => void(state.getAllMatches = action.payload),
    [getMatches.fulfilled]: (state, action) => void (state.getMatches = action.payload),
  }
});

export const { getTypeList, getTopLeague } = teamListSlice.actions;
export default teamListSlice.reducer;
