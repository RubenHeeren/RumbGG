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
    internal static string ThreeMainChampions(string encryptedSummonerId, Region region) => $"{ServerBaseUrl}/api/3-main-champions/?encryptedSummonerId={encryptedSummonerId}&region={(int)region}";
    internal static string MatchHistoryLast20RankedSolo5x5Games(string playerUniqueId, Region region) => $"{ServerBaseUrl}/api/match-history-last-20-ranked-solo-5x5-games/?playerUniqueId={playerUniqueId}&region={(int)region}";


    internal static string StaticFileChampionTiles = $"{ServerBaseUrl}/assets/img/champion-tiles";
}