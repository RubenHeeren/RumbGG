namespace Shared.Models;

public class WinrateDTOPast7Days
{
    /// e.g. 25-06-21
    public string ShortDateTime { get; set; } = default!;

    public int GamesLost { get; set; }

    public int GamesWon { get; set; }
}