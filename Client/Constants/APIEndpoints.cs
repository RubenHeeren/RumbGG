using RiotSharp.Misc;

namespace Client.Constants;

internal static class APIEndpoints
{
#if DEBUG
    internal const string ServerBaseUrl = "https://localhost:7124";
#else
        internal const string ServerBaseUrl = "https://johndoeserver.azurewebsites.net";
#endif

    internal static string Summoner(string name, Region region) => $"{ServerBaseUrl}/api/summoner/?name={name}&region={(int)region}";

    internal static string RankedSolo5x5LeagueEntry(string encryptedSummonerId, Region region) => $"{ServerBaseUrl}/api/ranked-solo-5x5-league-entry/?encryptedSummonerId={encryptedSummonerId}&region={(int)region}";
}