namespace WebAPI.Models
{
    public class MatchHistoryCardDTO
    {
        public string? matchType { get; set; }
        public string? matchStartingDate { get; set; }
        public int? durationInMinutes { get; set; }
        public bool? won { get; set; }
        public string? championName { get; set; }
        public int? summoner1Id { get; set; }
        public int? summoner2Id { get; set; }
        public int? kills { get; set; }
        public int? deaths { get; set; }
        public int? assists { get; set; }        
        public string? killParticipation { get; set; }
        public int? level { get; set; }
        public int? creepScore { get; set; }
        public int? gold { get; set; }
        public int? item0Id { get; set; }
        public int? item1Id { get; set; }
        public int? item2Id { get; set; }
        public int? item3Id { get; set; }
        public int? item4Id { get; set; }
        public int? item5Id { get; set; }
        public int? trinket { get; set; }
    }
}