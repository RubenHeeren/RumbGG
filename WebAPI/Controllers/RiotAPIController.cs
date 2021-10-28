using Microsoft.AspNetCore.Mvc;
using RiotSharp;
using RiotSharp.Endpoints.MatchEndpoint;
using RiotSharp.Endpoints.SummonerEndpoint;
using RiotSharp.Misc;
using RumbGG.Models;

namespace ReactUI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RiotAPIController : ControllerBase
    {
        private RiotApi api;

        public RiotAPIController()
        {
            api = RiotApi.GetDevelopmentInstance("RGAPI-e3e2f77d-df07-4fd8-82bc-70d1990a8d92");
        }

        [HttpGet]
        [Route("summoner")]
        public async Task<ActionResult<Summoner>> GetSummoner([FromQuery] GetSummonerQueryParameters getSummonerQueryParameters)
        {
            Region region = (Region)int.Parse(getSummonerQueryParameters.region);

            try
            {
                Summoner summoner = await api.Summoner.GetSummonerByNameAsync(region, getSummonerQueryParameters.name);                

                if (summoner != null)
                {
                    return Ok(summoner);
                }
                else
                {
                    return NotFound();
                }

            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet]
        [Route("matchlist")]
        public async Task<ActionResult<List<string>>> GetMatchlist([FromQuery] GetMatchQueryParameters getMatchQueryParameters)
        {
            Region region = (Region)int.Parse(getMatchQueryParameters.summonerRegion);

            // TODO: CONVERT ALL REGIONS TO europe, americas or asia

            switch (region)
            {
                case Region.Br:
                    break;
                case Region.Eune:
                    break;
                case Region.Euw:
                    region = Region.Europe;
                    break;
                case Region.Na:
                    break;
                case Region.Kr:
                    break;
                case Region.Lan:
                    break;
                case Region.Las:
                    break;
                case Region.Oce:
                    break;
                case Region.Ru:
                    break;
                case Region.Tr:
                    break;
                case Region.Jp:
                    break;
                case Region.Global:
                    break;
                case Region.Americas:
                    break;
                case Region.Europe:
                    break;
                case Region.Asia:
                    break;
                case Region.NoRegion:
                    break;
                case Region.Ap:
                    break;
                case Region.Eu:
                    break;
                case Region.Latam:
                    break;
                default:
                    break;
            }

            try
            {
                List<string> matchList = await api.Match.GetMatchListAsync(region, getMatchQueryParameters.puuid, 0, 20);

                if (matchList != null)
                {
                    return Ok(matchList);
                }
                else
                {
                    return NotFound();
                }

            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}