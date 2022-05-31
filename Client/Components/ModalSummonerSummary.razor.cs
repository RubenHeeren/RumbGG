using Microsoft.AspNetCore.Components;
using RiotSharp.Endpoints.LeagueEndpoint;

namespace Client.Components;

public partial class ModalSummonerSummary
{
    [Parameter]
    public LeagueEntry LeagueEntry { get; set; } = default!;

    [Parameter]
    public EventCallback OnClickBtnClose { get; set; } = default!;

    private async Task OnClickBtnCloseAsync() => await OnClickBtnClose.InvokeAsync();
}
