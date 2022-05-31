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

    private Summoner? _summoner;
    private LeagueEntry? _leagueEntry;

    private string _querySummonerName = "Rumb2";
    private Region _querySummonerRegion = Region.Euw;

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
        _summoner = await HttpClient.GetFromJsonAsync<Summoner>(APIEndpoints.Summoner(_querySummonerName, _querySummonerRegion));

        if (_summoner is not null)
        {
            Console.WriteLine($"Got summoner \"{_summoner.Name}\". Getting League entry...");

            try
            {
                _leagueEntry = await HttpClient.GetFromJsonAsync<LeagueEntry>(APIEndpoints.RankedSolo5x5LeagueEntry(_summoner.Id, _querySummonerRegion));

                Console.WriteLine($"Got league entry for summoner \"{_leagueEntry.SummonerName}\". Showing modal...");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to get league entry for summoner \"{_leagueEntry.SummonerName}\". Exception: {ex.Message}");
            }
        }
    }
}
