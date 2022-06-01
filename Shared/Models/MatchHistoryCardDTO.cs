namespace Shared.Models;

public class MatchHistoryAccordionDTO
{
    public string MatchType { get; set; } = default!;
    public string MatchStartingDate { get; set; } = default!;
    public int DurationInMinutes { get; set; }
    public bool Won { get; set; }
    public string ChampionName { get; set; } = default!;
    public int Summoner1Id { get; set; }
    public int Summoner2Id { get; set; }
    public int RunesStyle1Id { get; set; }
    public int RunesStyle2Id { get; set; }
    public int Kills { get; set; }
    public int Deaths { get; set; }
    public int Assists { get; set; }        
    public string KillParticipation { get; set; } = default!;
    public int Level { get; set; }
    public int CreepScore { get; set; }
    public int Gold { get; set; }
    public int Item0Id { get; set; }
    public int Item1Id { get; set; }
    public int Item2Id { get; set; }
    public int Item3Id { get; set; }
    public int Item4Id { get; set; }
    public int Item5Id { get; set; }
    public int TrinketId { get; set; }
}