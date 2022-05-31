using Client.Constants;
using Microsoft.AspNetCore.Components;
using Newtonsoft.Json;
using RiotSharp;
using RiotSharp.Endpoints.LeagueEndpoint;
using RiotSharp.Endpoints.SummonerEndpoint;
using RiotSharp.Misc;
using Shared.Models;
using System.Net.Http.Json;
using System.Net.Mime;
using System.Text;

namespace Client.Pages;

public partial class Index
{
    [Inject]
    HttpClient HttpClient { get; set; } = default!;

    private RiotApi? _riotApi;

    private Summoner? _summoner;
    private LeagueEntry? _leagueEntry;

    private string _querySummonerName = "Rumb2";
    private Region _querySummonerRegion = Region.Euw;

    protected override void OnInitialized()
    {
        // Generate new API key: https://developer.riotgames.com/
        _riotApi = RiotApi.GetDevelopmentInstance("RGAPI-bf667ca1-0bc2-486c-9b0e-8e0e5248d458");
    }

    private void OnChangeSummonerRegion(ChangeEventArgs e)
    {
        if (e.Value is not null)
        {
            // HTML select is always of type string.
            _querySummonerRegion = (Region)int.Parse(e.Value.ToString()!);
        }
    }

    private async Task HandleSubmitAsync()
    {
        try
        {
            _summoner = await _riotApi.Summoner.GetSummonerByNameAsync(_querySummonerRegion, _querySummonerName);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to get summoner with name \"{_querySummonerName}\". Exception: {ex.Message}");
        }        

        if (_summoner is not null)
        {
            Console.WriteLine($"Got summoner \"{_summoner.Name}\". Getting League entry...");

            try
            {
                List<LeagueEntry> leagueEntries = await _riotApi.League.GetLeagueEntriesBySummonerAsync(_querySummonerRegion, _summoner.Id);

                _leagueEntry = leagueEntries.First(rankedLeagueEntry => rankedLeagueEntry.QueueType == "RANKED_SOLO_5x5");

                Console.WriteLine($"Got league entry for summoner \"{_leagueEntry.SummonerName}\". Showing modal...");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to get league entry for summoner \"{_leagueEntry.SummonerName}\". Exception: {ex.Message}");
            }
        }
    }
}
