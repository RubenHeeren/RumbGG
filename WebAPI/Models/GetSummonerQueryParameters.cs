using RiotSharp.Misc;

namespace WebAPI.Models;

public class GetSummonerQueryParameters
{
    public string? Name { get; set; }
    public Region Region { get; set; }
}