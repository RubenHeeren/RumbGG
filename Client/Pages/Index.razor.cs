using Client.Constants;
using Microsoft.AspNetCore.Components;
using Newtonsoft.Json;
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

    private string _querySummonerName = string.Empty;
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

        if (_summoner != null)
        {
            Console.WriteLine($"Got summoner \"{_summoner.Name}\".");
        }
        else
        {
            Console.WriteLine("Failed to get summoner.");
        }
    }
}
