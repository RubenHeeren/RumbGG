using Microsoft.AspNetCore.Mvc;
using RiotSharp;
using RiotSharp.Endpoints.LeagueEndpoint;
using RiotSharp.Endpoints.MatchEndpoint;
using RiotSharp.Endpoints.SummonerEndpoint;
using RiotSharp.Misc;
using System.Globalization;
using WebAPI.Models;
using WebAPI.Utilities;
using RiotSharp.Endpoints.StaticDataEndpoint.Champion;
using RiotSharp.Endpoints.ChampionMasteryEndpoint;

namespace ReactUI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RiotAPIController : ControllerBase
    {
        private RiotApi api;

        public RiotAPIController()
        {
            api = RiotApi.GetDevelopmentInstance("RGAPI-d3c69544-d287-42ab-85e3-d730dfadd25e");
        }

        [HttpGet]
        [Route("summoner")]
        public async Task<ActionResult<Summoner>> GetSummoner([FromQuery] GetSummonerQueryParameters getSummonerQueryParameters)
        {
            Region region = (Region)int.Parse(getSummonerQueryParameters.region);

            try
            {
                Summoner summoner = await api.Summoner.GetSummonerByNameAsync(region, getSummonerQueryParameters.name);

                if (summoner != null)
                {
                    return Ok(summoner);
                }
                else
                {
                    return NotFound();
                }

            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet]
        [Route("3-main-champions")]
        public async Task<ActionResult<Top3PlayedChampionsCardDTO[]>> Get3MainChampions([FromQuery] Get3MainChampionsQueryParameters get3MainChampionsQueryParameters)
        {
            Region region = (Region)int.Parse(get3MainChampionsQueryParameters.region);
            List<ChampionMastery> championMasteries;

            try
            {
                championMasteries = await api.ChampionMastery.GetChampionMasteriesAsync(Region.Euw, get3MainChampionsQueryParameters.encryptedSummonerId);

                Top3PlayedChampionsCardDTO[] top3PlayedChampionsCardDTOs = new Top3PlayedChampionsCardDTO[3];

                for (int i = 0; i < top3PlayedChampionsCardDTOs.Length; i++)
                {                    
                    long id = championMasteries[i].ChampionId;

                    List<string> allVersions = api.DataDragon.Versions.GetAllAsync().Result;
                    string latestVersion = allVersions[0]; // Example of version: "10.23.1"

                    ChampionListStatic allChampions = await api.DataDragon.Champions.GetAllAsync(latestVersion);
                    string championName = allChampions.Champions.Values.Single(champion => champion.Id == id).Name;

                    string championNamePurified = championName;
                    var charsToRemove = new string[] { "@", ",", ".", ";", "'" };
                    foreach (var c in charsToRemove)
                    {
                        championNamePurified = championNamePurified.Replace(c, string.Empty);
                    }

                    top3PlayedChampionsCardDTOs[i] = new();
                    top3PlayedChampionsCardDTOs[i].name = championName;
                    top3PlayedChampionsCardDTOs[i].masteryPoints = championMasteries[i].ChampionPoints;
                    top3PlayedChampionsCardDTOs[i].relativeImagePath = $"assets/img/champion-tiles/{championNamePurified}_0.jpg";
                }

                return (top3PlayedChampionsCardDTOs);
            }
            catch (RiotSharpException ex)
            {
                // Handle the exception however you want.
                return NotFound(ex.Message);
            }

            
        }

        [HttpGet]
        [Route("ranked-solo-5x5-league-entry")]
        public async Task<ActionResult<LeagueEntry>> GetRankedSolo5x5leagueEntry([FromQuery] GetRankedSolo5x5leagueEntryQueryParameters getRankedSolo5x5leagueEntryQueryParameters)
        {
            try
            {
                Region region = (Region)int.Parse(getRankedSolo5x5leagueEntryQueryParameters.region);
                List<LeagueEntry> leagueEntries = await api.League.GetLeagueEntriesBySummonerAsync(region, getRankedSolo5x5leagueEntryQueryParameters.encryptedSummonerId);

                LeagueEntry rankedLeagueEntry = leagueEntries.First(rankedLeagueEntry => rankedLeagueEntry.QueueType == "RANKED_SOLO_5x5");

                return Ok(rankedLeagueEntry);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet]
        [Route("winrate-dtos-past-7-days")]
        public async Task<ActionResult<List<WinrateDTOPast7Days>>> GetWinrateDTOsPast7Days([FromQuery] GetWinrateDTOsPast7DaysQueryParameters getWinrateDTOsPast7DaysQueryParameters)
        {
            Region region = (Region)int.Parse(getWinrateDTOsPast7DaysQueryParameters.region);

            // TODO: CONVERT ALL REGIONS TO europe, americas or asia
            switch (region)
            {
                case Region.Br:
                    break;
                case Region.Eune:
                    break;
                case Region.Euw:
                    region = Region.Europe;
                    break;
                case Region.Na:
                    break;
                case Region.Kr:
                    break;
                case Region.Lan:
                    break;
                case Region.Las:
                    break;
                case Region.Oce:
                    break;
                case Region.Ru:
                    break;
                case Region.Tr:
                    break;
                case Region.Jp:
                    break;
                case Region.Global:
                    break;
                case Region.Americas:
                    break;
                case Region.Europe:
                    break;
                case Region.Asia:
                    break;
                case Region.NoRegion:
                    break;
                case Region.Ap:
                    break;
                case Region.Eu:
                    break;
                case Region.Latam:
                    break;
                default:
                    break;
            }
            try
            {
                List<string> matchList = await api.Match.GetMatchListAsync
                (
                    region,
                    getWinrateDTOsPast7DaysQueryParameters.puuid,
                    UtilityMethods.DateTimeToUnixTime(DateTime.Now.AddDays(-6)),
                    UtilityMethods.DateTimeToUnixTime(DateTime.Now),
                    null,
                    RiotSharp.Endpoints.MatchEndpoint.Enums.MatchFilterType.Ranked,
                    0,
                    100
                );

                Thread.CurrentThread.CurrentCulture = new CultureInfo("fr-FR");

                WinrateDTOPast7Days WinrateDTOPast7DaysToday = new WinrateDTOPast7Days();
                DateTime today = DateTime.Today;
                WinrateDTOPast7DaysToday.shortDateTime = today.ToShortDateString().Remove(6, 2);

                WinrateDTOPast7Days WinrateDTOPast7DaysYesterday = new WinrateDTOPast7Days();
                DateTime yesterday = DateTime.Today.AddDays(-1);
                WinrateDTOPast7DaysYesterday.shortDateTime = yesterday.ToShortDateString().Remove(6, 2);

                WinrateDTOPast7Days WinrateDTOPast7DaysTwoDaysAgo = new WinrateDTOPast7Days();
                DateTime twoDaysAgo = DateTime.Today.AddDays(-2);
                WinrateDTOPast7DaysTwoDaysAgo.shortDateTime = twoDaysAgo.ToShortDateString().Remove(6, 2);

                WinrateDTOPast7Days WinrateDTOPast7DaysThreeDaysAgo = new WinrateDTOPast7Days();
                DateTime threeDaysAgo = DateTime.Today.AddDays(-3);
                WinrateDTOPast7DaysThreeDaysAgo.shortDateTime = threeDaysAgo.ToShortDateString().Remove(6, 2);

                WinrateDTOPast7Days WinrateDTOPast7DaysFourDaysAgo = new WinrateDTOPast7Days();
                DateTime fourDaysAgo = DateTime.Today.AddDays(-4);
                WinrateDTOPast7DaysFourDaysAgo.shortDateTime = fourDaysAgo.ToShortDateString().Remove(6, 2);

                WinrateDTOPast7Days WinrateDTOPast7DaysFiveDaysAgo = new WinrateDTOPast7Days();
                DateTime fiveDaysAgo = DateTime.Today.AddDays(-5);
                WinrateDTOPast7DaysFiveDaysAgo.shortDateTime = fiveDaysAgo.ToShortDateString().Remove(6, 2);

                WinrateDTOPast7Days WinrateDTOPast7DaysSixDaysAgo = new WinrateDTOPast7Days();
                DateTime sixDaysAgo = DateTime.Today.AddDays(-6);
                WinrateDTOPast7DaysSixDaysAgo.shortDateTime = sixDaysAgo.ToShortDateString().Remove(6, 2);

                foreach (string matchId in matchList)
                {
                    Match match = await api.Match.GetMatchAsync(region, matchId);

                    // Participants are stored by their puuid's. So let's find this summoner.
                    Participant participant = match.Info.Participants.First(participant => participant.Puuid == getWinrateDTOsPast7DaysQueryParameters.puuid);

                    DateTime gameStartDateTime = UtilityMethods.UnixTimeToDateTime(match.Info.GameStartTimestamp);

                    DateTime gameEndDate = gameStartDateTime.Add(participant.timePlayed).Date;

                    if (gameEndDate == today.Date)
                    {
                        if (participant.Winner)
                        {
                            WinrateDTOPast7DaysToday.gamesWon += 1;
                        }
                        else
                        {
                            WinrateDTOPast7DaysToday.gamesLost += 1;
                        }
                    }
                    else if (gameEndDate == yesterday.Date)
                    {
                        if (participant.Winner)
                        {
                            WinrateDTOPast7DaysYesterday.gamesWon += 1;
                        }
                        else
                        {
                            WinrateDTOPast7DaysYesterday.gamesLost += 1;
                        }
                    }
                    else if (gameEndDate == twoDaysAgo.Date)
                    {
                        if (participant.Winner)
                        {
                            WinrateDTOPast7DaysTwoDaysAgo.gamesWon += 1;
                        }
                        else
                        {
                            WinrateDTOPast7DaysTwoDaysAgo.gamesLost += 1;
                        }
                    }
                    else if (gameEndDate == threeDaysAgo.Date)
                    {
                        if (participant.Winner)
                        {
                            WinrateDTOPast7DaysThreeDaysAgo.gamesWon += 1;
                        }
                        else
                        {
                            WinrateDTOPast7DaysThreeDaysAgo.gamesLost += 1;
                        }
                    }
                    else if (gameEndDate == fourDaysAgo.Date)
                    {
                        if (participant.Winner)
                        {
                            WinrateDTOPast7DaysFourDaysAgo.gamesWon += 1;
                        }
                        else
                        {
                            WinrateDTOPast7DaysFourDaysAgo.gamesLost += 1;
                        }
                    }
                    else if (gameEndDate == fiveDaysAgo.Date)
                    {
                        if (participant.Winner)
                        {
                            WinrateDTOPast7DaysFiveDaysAgo.gamesWon += 1;
                        }
                        else
                        {
                            WinrateDTOPast7DaysFiveDaysAgo.gamesLost += 1;
                        }
                    }
                    else if (gameEndDate == sixDaysAgo.Date)
                    {
                        if (participant.Winner)
                        {
                            WinrateDTOPast7DaysSixDaysAgo.gamesWon += 1;
                        }
                        else
                        {
                            WinrateDTOPast7DaysSixDaysAgo.gamesLost += 1;
                        }
                    }
                }

                List<WinrateDTOPast7Days> WinrateDTOsPast7DaysToReturn = new();
                WinrateDTOsPast7DaysToReturn.Add(WinrateDTOPast7DaysToday);
                WinrateDTOsPast7DaysToReturn.Add(WinrateDTOPast7DaysYesterday);
                WinrateDTOsPast7DaysToReturn.Add(WinrateDTOPast7DaysTwoDaysAgo);
                WinrateDTOsPast7DaysToReturn.Add(WinrateDTOPast7DaysThreeDaysAgo);
                WinrateDTOsPast7DaysToReturn.Add(WinrateDTOPast7DaysFourDaysAgo);
                WinrateDTOsPast7DaysToReturn.Add(WinrateDTOPast7DaysFiveDaysAgo);
                WinrateDTOsPast7DaysToReturn.Add(WinrateDTOPast7DaysSixDaysAgo);

                return Ok(WinrateDTOsPast7DaysToReturn);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}