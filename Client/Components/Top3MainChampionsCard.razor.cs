using Microsoft.AspNetCore.Components;

namespace Client.Components;

public partial class Top3MainChampionsCard
{
    [Parameter]
    public Top3MainChampionsCardDTO Top3MainChampionsCardEntry { get; set; } = default!;
}
