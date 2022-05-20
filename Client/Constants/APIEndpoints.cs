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
}