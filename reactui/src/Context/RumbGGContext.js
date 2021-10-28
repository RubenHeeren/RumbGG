import React from 'react';

// Context = app wide or component wide state
// Could be of any type. Usually it's an object.
const RumbGGContext = React.createContext({
    summoner: {},
    setSummoner: () => {}
});

export default RumbGGContext;