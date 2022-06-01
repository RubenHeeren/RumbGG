using BlazorStrap;
using Client.Constants;
using Microsoft.AspNetCore.Components;
using RiotSharp.Endpoints.LeagueEndpoint;
using RiotSharp.Endpoints.SummonerEndpoint;
using RiotSharp.Misc;
using System.Net.Http.Json;

namespace Client.Pages;

public partial class Index
{
    // Blazor makes sure this is not null.
    [Inject]
    HttpClient HttpClient { get; set; } = default!;

    // Blazor makes sure this is not null.
    private BSModal _modalSummonerSummary = default!;

    private Summoner? _summoner;
    private LeagueEntry? _leagueEntry;
    private Top3MainChampionsCardDTO[]? _top3MainChampionsCards;
    private MatchHistoryAccordionDTO[]? _matchHistoryAccordions;

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
        await _modalSummonerSummary.ShowAsync();

        try
        {
            _summoner = await HttpClient.GetFromJsonAsync<Summoner>(APIEndpoints.Summoner(_querySummonerName, _querySummonerRegion));

            await InvokeAsync(StateHasChanged);

            if (_summoner is not null)
            {
                Console.WriteLine($"Got summoner \"{_summoner.Name}\". Getting League entry...");

                _leagueEntry = await HttpClient.GetFromJsonAsync<LeagueEntry>(APIEndpoints.RankedSolo5x5LeagueEntry(_summoner.Id, _querySummonerRegion));

                await InvokeAsync(StateHasChanged);

                _top3MainChampionsCards = await HttpClient.GetFromJsonAsync<Top3MainChampionsCardDTO[]>(APIEndpoints.ThreeMainChampions(_summoner.Id, _querySummonerRegion));

                await InvokeAsync(StateHasChanged);

                _matchHistoryAccordions = await HttpClient.GetFromJsonAsync<MatchHistoryAccordionDTO[]>(APIEndpoints.MatchHistoryLast20RankedSolo5x5Games(_summoner.Puuid, _querySummonerRegion));
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Caught exception: \"{ex.Message}\".\nStack trace:\n{ex.StackTrace}");            
        }        
    }
}
