using Microsoft.AspNetCore.Mvc;
using RiotSharp;
using RiotSharp.Endpoints.LeagueEndpoint;
using RiotSharp.Endpoints.MatchEndpoint;
using RiotSharp.Endpoints.SummonerEndpoint;
using RiotSharp.Misc;
using System.Globalization;
using RiotSharp.Endpoints.StaticDataEndpoint.Champion;
using RiotSharp.Endpoints.ChampionMasteryEndpoint;
using WebAPI.Utilities;
using Shared.Models;

namespace ReactUI.Controllers;

// Generate new API key: https://developer.riotgames.com/
[ApiController]
public class RiotAPIController : ControllerBase
{
    private readonly RiotApi _riotApi;

    public RiotAPIController()
    {
        _riotApi = RiotApi.GetDevelopmentInstance("RGAPI-bf667ca1-0bc2-486c-9b0e-8e0e5248d458");
    }

    [HttpGet]
    [Route("api/summoner")]
    public async Task<ActionResult<Summoner>> GetSummoner(string name, Region region)
    {
        try
        {
            var summoner = await _riotApi.Summoner.GetSummonerByNameAsync(region, name);

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
    [Route("api/ranked-solo-5x5-league-entry")]
    public async Task<ActionResult<LeagueEntry>> GetRankedSolo5x5leagueEntry(string encryptedSummonerId, Region region)
    {
        try
        {
            List<LeagueEntry> leagueEntries = await _riotApi.League.GetLeagueEntriesBySummonerAsync(region, encryptedSummonerId);

            LeagueEntry rankedLeagueEntry = leagueEntries.First(rankedLeagueEntry => rankedLeagueEntry.QueueType == "RANKED_SOLO_5x5");

            return Ok(rankedLeagueEntry);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet]
    [Route("api/3-main-champions")]
    public async Task<ActionResult<Top3MainChampionsCardDTO[]>> Get3MainChampions(string encryptedSummonerId, Region region)
    {
        try
        {
            List<ChampionMastery> championMasteries = await _riotApi.ChampionMastery.GetChampionMasteriesAsync(region, encryptedSummonerId);

            Top3MainChampionsCardDTO[] top3PlayedChampionsCardDTOsToReturn = new Top3MainChampionsCardDTO[3];

            for (int i = 0; i < top3PlayedChampionsCardDTOsToReturn.Length; i++)
            {
                long id = championMasteries[i].ChampionId;

                List<string> allVersions = _riotApi.DataDragon.Versions.GetAllAsync().Result;
                string latestVersion = allVersions[0];

                ChampionListStatic allChampions = await _riotApi.DataDragon.Champions.GetAllAsync(latestVersion);
                string championName = allChampions.Champions.Values.Single(champion => champion.Id == id).Name;

                string championNameNoSpecialCharacters = championName;
                var charactersToRemove = new string[] { "@", ",", ".", ";", "'" };

                foreach (var character in charactersToRemove)
                {
                    championNameNoSpecialCharacters = championNameNoSpecialCharacters.Replace(character, string.Empty);
                }

                top3PlayedChampionsCardDTOsToReturn[i] = new()
                {
                    Name = championName,
                    MasteryPoints = championMasteries[i].ChampionPoints,
                    RelativeImagePath = $"assets/img/champion-tiles/{championNameNoSpecialCharacters}_0.jpg"
                };
            }

            return (top3PlayedChampionsCardDTOsToReturn);
        }
        catch (RiotSharpException ex)
        {
            // Handle the exception however you want.
            return NotFound(ex.Message);
        }
    }    

    [HttpGet]
    [Route("api/match-history-last-20-ranked-solo-5x5-games")]
    public async Task<ActionResult<MatchHistoryAccordionDTO[]>> GetMatchHistoryCardDTOsLast3RankedGames(string playerUniqueId, Region region)
    {
        int amountOfGames = 20;

        List<string> matchList = await _riotApi.Match.GetMatchListAsync
        (
            ConvertSpecificRegionToContinent(region),
            playerUniqueId,
            UtilityMethods.DateTimeToUnixTime(DateTime.Now.AddDays(-90)),
            UtilityMethods.DateTimeToUnixTime(DateTime.Now),
            null,
            RiotSharp.Endpoints.MatchEndpoint.Enums.MatchFilterType.Ranked,
            0,
            amountOfGames
        );

        Match[] matches = new Match[amountOfGames];
        MatchHistoryAccordionDTO[] matchHistoryCardDTOs = new MatchHistoryAccordionDTO[amountOfGames];

        for (int i = 0; i < amountOfGames; i++)
        {
            matches[i] = await _riotApi.Match.GetMatchAsync(ConvertSpecificRegionToContinent(region), matchList[i]);
            Participant queryingPlayerParticipant = matches[i].Info.Participants.First(participant => participant.Puuid == playerUniqueId);

            int teamTotalKills = 0;
            foreach (var teammateParticipant in matches[i].Info.Participants.Where(participant => participant.TeamId == queryingPlayerParticipant.TeamId))
            {
                teamTotalKills += (int)teammateParticipant.Kills;
            }

            matchHistoryCardDTOs[i] = new();

            matchHistoryCardDTOs[i].MatchType = matches[i].Info.QueueId == 420 ? "5v5 Ranked Solo/Duo" : "5v5 Ranked Flex";
            matchHistoryCardDTOs[i].MatchStartingDate = matches[i].Info.GameCreation.ToShortDateString() + " " + matches[i].Info.GameCreation.ToLongTimeString();
            matchHistoryCardDTOs[i].DurationInMinutes = (int)(matches[i].Info.GameDuration.TotalMinutes * 1000);
            matchHistoryCardDTOs[i].Won = queryingPlayerParticipant.Winner;

            matchHistoryCardDTOs[i].ChampionName = queryingPlayerParticipant.ChampionName;
            matchHistoryCardDTOs[i].Summoner1Id = queryingPlayerParticipant.Summoner1Id;
            matchHistoryCardDTOs[i].Summoner2Id = queryingPlayerParticipant.Summoner2Id;
            matchHistoryCardDTOs[i].RunesStyle1Id = queryingPlayerParticipant.Perks.Styles[0].Style;
            matchHistoryCardDTOs[i].RunesStyle2Id = queryingPlayerParticipant.Perks.Styles[1].Style;

            matchHistoryCardDTOs[i].Kills = (int)queryingPlayerParticipant.Kills;
            matchHistoryCardDTOs[i].Deaths = (int)queryingPlayerParticipant.Deaths;
            matchHistoryCardDTOs[i].Assists = (int)queryingPlayerParticipant.Assists;
            matchHistoryCardDTOs[i].KillParticipation = ((int)((((float)matchHistoryCardDTOs[i].Kills + (float)matchHistoryCardDTOs[i].Assists) / (float)teamTotalKills) * 100f)).ToString() + "%";
            matchHistoryCardDTOs[i].Level = (int)queryingPlayerParticipant.ChampLevel;
            matchHistoryCardDTOs[i].CreepScore = (int)(queryingPlayerParticipant.TotalMinionsKilled + queryingPlayerParticipant.NeutralMinionsKilled);
            matchHistoryCardDTOs[i].Gold = (int)queryingPlayerParticipant.GoldEarned;
            matchHistoryCardDTOs[i].Item0Id = (int)queryingPlayerParticipant.Item0;
            matchHistoryCardDTOs[i].Item1Id = (int)queryingPlayerParticipant.Item1;
            matchHistoryCardDTOs[i].Item2Id = (int)queryingPlayerParticipant.Item2;
            matchHistoryCardDTOs[i].Item3Id = (int)queryingPlayerParticipant.Item3;
            matchHistoryCardDTOs[i].Item4Id = (int)queryingPlayerParticipant.Item4;
            matchHistoryCardDTOs[i].Item5Id = (int)queryingPlayerParticipant.Item5;
            matchHistoryCardDTOs[i].TrinketId = (int)queryingPlayerParticipant.Item6;
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
