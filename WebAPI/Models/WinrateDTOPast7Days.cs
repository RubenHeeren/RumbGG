namespace WebAPI.Models
{
    public class WinrateDTOPast7Days
    {
        /// e.g. 25-06-21
        public string? shortDateTime { get; set; }
        public int gamesLost { get; set; }
        public int gamesWon { get; set; }
    }
}