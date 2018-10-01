using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using nfernopoker.Domain.Apis;
using nfernopoker.Domain.Models;
using TinyOAuth1;

namespace nfernopoker.Controllers
{
  [Route("api/[controller]")]
  public class JiraController : Controller
  {
    private readonly IJiraApi _jiraApi;
    private readonly ITinyOAuth _tinyOAuth;
    private static AccessTokenInfo _accessToken;
    private readonly TinyOAuthConfig _config;

    public JiraController(IJiraApi jiraApi, ITinyOAuth tinyOAuth, TinyOAuthConfig config)
    {
      _jiraApi = jiraApi ?? throw new ArgumentNullException(nameof(jiraApi));
      _tinyOAuth = tinyOAuth ?? throw new ArgumentNullException(nameof(tinyOAuth));
      _config = config;
    }

    [HttpGet]
    public IActionResult Get()
    {
      var requestTokenInfo = _tinyOAuth.GetRequestTokenAsync().Result;

      var authorizationUrl = _tinyOAuth.GetAuthorizationUrl(requestTokenInfo.RequestToken);

      return Redirect(authorizationUrl);
    }

    [HttpGet("callback")]
    public async Task<IActionResult> CallbackHandler(string oauth_token, string oauth_verifier)
    {

      _accessToken = await _tinyOAuth.GetAccessTokenAsync(oauth_token, "nfernopoker2", oauth_verifier);

      var httpClient = new HttpClient(new TinyOAuthMessageHandler(_config, _accessToken.AccessToken, _accessToken.AccessTokenSecret));

      // Now we just use the HttpClient like normally
      var resp = await httpClient.GetAsync("https://nfernopoker.atlassian.net/rest/api/latest/issue/NFER-1.json");
      var respJson = await resp.Content.ReadAsStringAsync();

      return Redirect("http://localhost:3000");
    }

    [HttpGet("issue/{id}")]
    public async Task<JsonResult> GetIssueById(string id)
    {
      var httpClient = new HttpClient(new TinyOAuthMessageHandler(_config, _accessToken.AccessToken, _accessToken.AccessTokenSecret));

      // Now we just use the HttpClient like normally
      var resp = await httpClient.GetAsync($"https://nfernopoker.atlassian.net/rest/api/latest/issue/{id}.json");
      return Json(await resp.Content.ReadAsStringAsync());
    }
  }
}
