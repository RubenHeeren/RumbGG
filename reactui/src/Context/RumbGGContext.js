import React from 'react';

// Context = app wide or component wide state
// Could be of any type. Usually it's an object.
const RumbGGContext = React.createContext({
    summonerState: {
        summoner: {},
        setSummoner: () => {},
    },
    winRateDTOsPast7DaysState: {
        winRateDTOsPast7Days: [],
        setWinRateDTOsPast7Days: () => {}
    }        
});

export default RumbGGContext;