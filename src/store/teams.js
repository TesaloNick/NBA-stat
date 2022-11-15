import { createSlice } from '@reduxjs/toolkit';

let teamsData = [
  { id: 1, abbreviation: "ATL", full_name: "Atlanta Hawks" },
  { id: 2, abbreviation: "BOS", full_name: "Boston Celtics" },
  { id: 3, abbreviation: "BKN", full_name: "Brooklyn Nets" },
  { id: 4, abbreviation: "CHA", full_name: "Charlotte Hornets" },
  { id: 5, abbreviation: "CHI", full_name: "Chicago Bulls" },
  { id: 6, abbreviation: "CLE", full_name: "Cleveland Cavaliers" },
  { id: 7, abbreviation: "DAL", full_name: "Dallas Mavericks" },
  { id: 8, abbreviation: "DEN", full_name: "Denver Nuggets" },
  { id: 9, abbreviation: "DET", full_name: "Detroit Pistons" },
  { id: 10, abbreviation: "GSW", full_name: "Golden State Warriors" },
  { id: 11, abbreviation: "HOU", full_name: "Houston Rockets" },
  { id: 12, abbreviation: "IND", full_name: "Indiana Pacers" },
  { id: 13, abbreviation: "LAC", full_name: "LA Clippers" },
  { id: 14, abbreviation: "LAL", full_name: "Los Angeles Lakers" },
  { id: 15, abbreviation: "MEM", full_name: "Memphis Grizzlies" },
  { id: 16, abbreviation: "MIA", full_name: "Miami Heat" },
  { id: 17, abbreviation: "MIL", full_name: "Milwaukee Bucks" },
  { id: 18, abbreviation: "MIN", full_name: "Minnesota Timberwolves" },
  { id: 19, abbreviation: "NOP", full_name: "New Orleans Pelicans" },
  { id: 20, abbreviation: "NYK", full_name: "New York Knicks" },
  { id: 21, abbreviation: "OKC", full_name: "Oklahoma City Thunder" },
  { id: 22, abbreviation: "ORL", full_name: "Orlando Magic" },
  { id: 23, abbreviation: "PHI", full_name: "Philadelphia 76ers" },
  { id: 24, abbreviation: "PHX", full_name: "Phoenix Suns" },
  { id: 25, abbreviation: "POR", full_name: "Portland Trail Blazers" },
  { id: 26, abbreviation: "SAC", full_name: "Sacramento Kings" },
  { id: 27, abbreviation: "SAS", full_name: "San Antonio Spurs" },
  { id: 28, abbreviation: "TOR", full_name: "Toronto Raptors" },
  { id: 29, abbreviation: "UTA", full_name: "Utah Jazz" },
  { id: 30, abbreviation: "WAS", full_name: "Washington Wizards" },
]

const teams = createSlice({
  name: 'teams',
  initialState: {
    teams: teamsData,
  },
  reducers: {},
});

export default teams.reducer;