using Microsoft.AspNetCore.Mvc;
using RiotSharp;
using RiotSharp.Endpoints.LeagueEndpoint;
using RiotSharp.Endpoints.MatchEndpoint;
using RiotSharp.Endpoints.SummonerEndpoint;
using RiotSharp.Misc;
using System.Globalization;
using WebAPI.Models;
using RiotSharp.Endpoints.StaticDataEndpoint.Champion;
using RiotSharp.Endpoints.ChampionMasteryEndpoint;
using WebAPI.Utilities;

namespace ReactUI.Controllers;

[ApiController]
[Route("[controller]")]
public class RiotAPIController : ControllerBase
{
    private RiotApi _riotApi;

    public RiotAPIController()
    {
        _riotApi = RiotApi.GetDevelopmentInstance("RGAPI-7a5ba71d-ddb9-4ddd-a8fe-b96536009685");
    }

    [HttpGet]
    [Route("summoner")]
    public async Task<ActionResult<Summoner>> GetSummoner([FromQuery] GetSummonerQueryParameters queryParams)
    {
        try
        {
            var summoner = await _riotApi.Summoner.GetSummonerByNameAsync(queryParams.Region, queryParams.Name);

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
            championMasteries = await _riotApi.ChampionMastery.GetChampionMasteriesAsync(Region.Euw, get3MainChampionsQueryParameters.encryptedSummonerId);

            Top3PlayedChampionsCardDTO[] top3PlayedChampionsCardDTOs = new Top3PlayedChampionsCardDTO[3];

            for (int i = 0; i < top3PlayedChampionsCardDTOs.Length; i++)
            {
                long id = championMasteries[i].ChampionId;

                List<string> allVersions = _riotApi.DataDragon.Versions.GetAllAsync().Result;
                string latestVersion = allVersions[0]; // Example of version: "10.23.1"

                ChampionListStatic allChampions = await _riotApi.DataDragon.Champions.GetAllAsync(latestVersion);
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
            List<LeagueEntry> leagueEntries = await _riotApi.League.GetLeagueEntriesBySummonerAsync(region, getRankedSolo5x5leagueEntryQueryParameters.encryptedSummonerId);

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

        try
        {
            List<string> matchList = await _riotApi.Match.GetMatchListAsync
            (
                ConvertSpecificRegionToContinent(region),
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
                Match match = await _riotApi.Match.GetMatchAsync(ConvertSpecificRegionToContinent(region), matchId);

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

    [HttpGet]
    [Route("match-history-card-dtos-last-3-ranked-games")]
    public async Task<ActionResult<MatchHistoryCardDTO[]>> GetMatchHistoryCardDTOsLast3RankedGames([FromQuery] GetMatchHistoryCardDTOsLast3RankedGamesQueryParameters getMatchHistoryCardDTOsLast3RankedGamesQueryParameters)
    {
        Region region = (Region)int.Parse(getMatchHistoryCardDTOsLast3RankedGamesQueryParameters.region);

        var matchList = await _riotApi.Match.GetMatchListAsync
        (
            ConvertSpecificRegionToContinent(region),
            getMatchHistoryCardDTOsLast3RankedGamesQueryParameters.puuid,
            UtilityMethods.DateTimeToUnixTime(DateTime.Now.AddDays(-90)),
            UtilityMethods.DateTimeToUnixTime(DateTime.Now),
            null,
            RiotSharp.Endpoints.MatchEndpoint.Enums.MatchFilterType.Ranked,
            0,
            3
        );

        Match[] matches = new Match[3];
        MatchHistoryCardDTO[] matchHistoryCardDTOs = new MatchHistoryCardDTO[3];

        for (int i = 0; i < 3; i++)
        {
            matches[i] = await _riotApi.Match.GetMatchAsync(ConvertSpecificRegionToContinent(region), matchList[i]);
            Participant queryingPlayerParticipant = matches[i].Info.Participants.First(participant => participant.Puuid == getMatchHistoryCardDTOsLast3RankedGamesQueryParameters.puuid);

            int teamTotalKills = 0;
            foreach (var teammateParticipant in matches[i].Info.Participants.Where(participant => participant.TeamId == queryingPlayerParticipant.TeamId))
            {
                teamTotalKills += (int)teammateParticipant.Kills;
            }

            matchHistoryCardDTOs[i] = new();

            matchHistoryCardDTOs[i].matchType = matches[i].Info.QueueId == 420 ? "5v5 Ranked Solo/Duo" : "5v5 Ranked Flex";
            matchHistoryCardDTOs[i].matchStartingDate = matches[i].Info.GameCreation.ToShortDateString() + " " + matches[i].Info.GameCreation.ToLongTimeString();
            matchHistoryCardDTOs[i].durationInMinutes = (int)(matches[i].Info.GameDuration.TotalMinutes * 1000);
            matchHistoryCardDTOs[i].won = queryingPlayerParticipant.Winner;

            matchHistoryCardDTOs[i].championName = queryingPlayerParticipant.ChampionName;
            matchHistoryCardDTOs[i].summoner1Id = queryingPlayerParticipant.Summoner1Id;
            matchHistoryCardDTOs[i].summoner2Id = queryingPlayerParticipant.Summoner2Id;
            matchHistoryCardDTOs[i].style1Id = queryingPlayerParticipant.Perks.Styles[0].Style;
            matchHistoryCardDTOs[i].style2Id = queryingPlayerParticipant.Perks.Styles[1].Style;

            matchHistoryCardDTOs[i].kills = (int)queryingPlayerParticipant.Kills;
            matchHistoryCardDTOs[i].deaths = (int)queryingPlayerParticipant.Deaths;
            matchHistoryCardDTOs[i].assists = (int)queryingPlayerParticipant.Assists;
            matchHistoryCardDTOs[i].killParticipation = ((int)((((float)matchHistoryCardDTOs[i].kills + (float)matchHistoryCardDTOs[i].assists) / (float)teamTotalKills) * 100f)).ToString() + "%";
            matchHistoryCardDTOs[i].level = (int)queryingPlayerParticipant.ChampLevel;
            matchHistoryCardDTOs[i].creepScore = (int)(queryingPlayerParticipant.TotalMinionsKilled + queryingPlayerParticipant.NeutralMinionsKilled);
            matchHistoryCardDTOs[i].gold = (int)queryingPlayerParticipant.GoldEarned;
            matchHistoryCardDTOs[i].item0Id = (int)queryingPlayerParticipant.Item0;
            matchHistoryCardDTOs[i].item1Id = (int)queryingPlayerParticipant.Item1;
            matchHistoryCardDTOs[i].item2Id = (int)queryingPlayerParticipant.Item2;
            matchHistoryCardDTOs[i].item3Id = (int)queryingPlayerParticipant.Item3;
            matchHistoryCardDTOs[i].item4Id = (int)queryingPlayerParticipant.Item4;
            matchHistoryCardDTOs[i].item5Id = (int)queryingPlayerParticipant.Item5;
            matchHistoryCardDTOs[i].trinketId = (int)queryingPlayerParticipant.Item6;
        }

        return Ok(matchHistoryCardDTOs);
    }

    private Region ConvertSpecificRegionToContinent(Region region)
    {
        switch (region)
        {
            case Region.Br:
                return Region.Americas;
            case Region.Eune:
                return Region.Europe;
            case Region.Euw:
                return Region.Europe;
            case Region.Na:
                return Region.Americas;
            case Region.Kr:
                return Region.Asia;
            case Region.Lan:
                return Region.Americas;
            case Region.Las:
                return Region.Americas;
            case Region.Oce:
                return Region.Asia;
            case Region.Ru:
                return Region.Europe;
            case Region.Tr:
                return Region.Europe;
            case Region.Jp:
                return Region.Asia;
            case Region.Global:
                return Region.Global;
            case Region.Americas:
                return Region.Americas;
            case Region.Europe:
                return Region.Europe;
            case Region.Asia:
                return Region.Asia;
            case Region.NoRegion:
                return Region.NoRegion;
            case Region.Ap:
                return Region.Asia;
            case Region.Eu:
                return Region.Europe;
            case Region.Latam:
                return Region.Americas;
            default:
                return Region.Global;
        }
    }
}
