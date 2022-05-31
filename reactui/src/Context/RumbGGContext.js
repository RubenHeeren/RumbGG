import React from 'react';

// Context = app wide or component wide state
// Could be of any type. Usually it's an object.
const RumbGGContext = React.createContext({
    summonerState: {
        summoner: {},
        setSummoner: () => { }
    },
    summonerRankedSolo5x5LeagueEntryState: {
        summonerRankedSolo5x5LeagueEntry: {},
        setSummonerRankedSolo5x5LeagueEntry: () => { }
    },
    winRateDTOsPast7DaysState: {
        winRateDTOsPast7Days: [],
        setWinRateDTOsPast7Days: () => { }
    },
    threeMainChampionsState: {
        threeMainChampions: [],
        setThreeMainChampions: () => { }
    },
    matchHistoryCardDTOsLast3RankedGamesState: {
        matchHistoryCardDTOsLast3RankedGames: [],
        setMatchHistoryCardDTOsLast3RankedGames: () => { }
    },
    fetchingSummonerDataState: {
        fetchingSummonerData: false,
        setFetchingSummonerData: () => { }
    }
});

export default RumbGGContext;
