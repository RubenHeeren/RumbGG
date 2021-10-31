const endpoints = {
  SUMMONER: 'summoner',
  THREE_MAIN_CHAMPIONS: '3-main-champions',
  RANKED_SOLO_5X5_LEAGUE_ENTRY: 'ranked-solo-5x5-league-entry',
  WINRATE_DTOS_PAST_SEVEN_DAYS: 'winrate-dtos-past-7-days',
  MATCH_HISTORY_CARD_DTOS_LAST_THREE_RANKED_GAMES: 'match-history-card-dtos-last-3-ranked-games'
};

const API_BASE_URL_PRODUCTION = "https://myapp.herokuapp.com/riotapi";
const STATIC_FILES_BASE_URL_PRODUCTION = "https://myapp.herokuapp.com";

const API_BASE_URL_DEVELOPMENT = "https://localhost:7124/riotapi";
const STATIC_FILES_BASE_URL_DEVELOPMENT = "https://localhost:7124";

const production = {
  API_URL_SUMMONER: `${API_BASE_URL_PRODUCTION}/${endpoints.SUMMONER}`,
  API_URL_THREE_MAIN_CHAMPIONS: `${API_BASE_URL_PRODUCTION}/${endpoints.THREE_MAIN_CHAMPIONS}`,
  API_URL_RANKED_SOLO_5X5_LEAGUE_ENTRY: `${API_BASE_URL_PRODUCTION}/${endpoints.RANKED_SOLO_5X5_LEAGUE_ENTRY}`,
  API_URL_WINRATE_DTOS_PAST_SEVEN_DAYS: `${API_BASE_URL_PRODUCTION}/${endpoints.WINRATE_DTOS_PAST_SEVEN_DAYS}`,
  API_URL_MATCH_HISTORY_CARD_DTOS_LAST_THREE_RANKED_GAMES: `${API_BASE_URL_PRODUCTION}/${endpoints.MATCH_HISTORY_CARD_DTOS_LAST_THREE_RANKED_GAMES}`,
  STATIC_FILE_URL_CHAMPION_TILES: `${STATIC_FILES_BASE_URL_PRODUCTION}/assets/img/champion-tiles`,
  STATIC_FILE_URL_ITEMS: `${STATIC_FILES_BASE_URL_PRODUCTION}/assets/img/items`,
  STATIC_FILE_URL_PROFILE_ICONS: `${STATIC_FILES_BASE_URL_PRODUCTION}/assets/img/profile-icons`,
  STATIC_FILE_URL_STYLES: `${STATIC_FILES_BASE_URL_PRODUCTION}/assets/img/styles`,
  STATIC_FILE_URL_SUMMONER_SPELLS: `${STATIC_FILES_BASE_URL_PRODUCTION}/assets/img/summoner-spells`
};

const development = {
  API_URL_SUMMONER: `${API_BASE_URL_DEVELOPMENT}/${endpoints.SUMMONER}`,
  API_URL_THREE_MAIN_CHAMPIONS: `${API_BASE_URL_DEVELOPMENT}/${endpoints.THREE_MAIN_CHAMPIONS}`,
  API_URL_RANKED_SOLO_5X5_LEAGUE_ENTRY: `${API_BASE_URL_DEVELOPMENT}/${endpoints.RANKED_SOLO_5X5_LEAGUE_ENTRY}`,
  API_URL_WINRATE_DTOS_PAST_SEVEN_DAYS: `${API_BASE_URL_DEVELOPMENT}/${endpoints.WINRATE_DTOS_PAST_SEVEN_DAYS}`,
  API_URL_MATCH_HISTORY_CARD_DTOS_LAST_THREE_RANKED_GAMES: `${API_BASE_URL_DEVELOPMENT}/${endpoints.MATCH_HISTORY_CARD_DTOS_LAST_THREE_RANKED_GAMES}`,
  STATIC_FILE_URL_CHAMPION_TILES: `${STATIC_FILES_BASE_URL_DEVELOPMENT}/assets/img/champion-tiles`,
  STATIC_FILE_URL_ITEMS: `${STATIC_FILES_BASE_URL_DEVELOPMENT}/assets/img/items`,
  STATIC_FILE_URL_PROFILE_ICONS: `${STATIC_FILES_BASE_URL_DEVELOPMENT}/assets/img/profile-icons`,
  STATIC_FILE_URL_STYLES: `${STATIC_FILES_BASE_URL_DEVELOPMENT}/assets/img/styles`,
  STATIC_FILE_URL_SUMMONER_SPELLS: `${STATIC_FILES_BASE_URL_DEVELOPMENT}/assets/img/summoner-spells`
};

export const Constants = process.env.NODE_ENV === "development" ? development : production;

// REGIONS
// Brasil | Br = 0,
// North-eastern europe | Eune = 1
// Western europe | Euw = 2
// North america | Na = 3
// South korea | Kr = 4
// Latin America North | Lan = 5
// Latin America South | Las = 6
// Oceania | Oce = 7
// Russia | Ru = 8
// Turkey | Tr = 9
// Japan | Jp = 10
// Global | Global = 11

// Regional proxy for services only deployed in North America. For example the tournament and tournament stub services.
// Americas = 12
// Europe = 13
// Asia = 14
// NoRegion = 15
