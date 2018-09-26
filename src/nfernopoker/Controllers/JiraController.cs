using System;
using System.Collections.Generic;
using System.Linq;
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
    private static string _oauth_token;

    public JiraController(IJiraApi jiraApi, ITinyOAuth tinyOAuth)
    {
      _jiraApi = jiraApi ?? throw new ArgumentNullException(nameof(jiraApi));
      _tinyOAuth = tinyOAuth ?? throw new ArgumentNullException(nameof(tinyOAuth));
    }

    [HttpGet]
    public IActionResult Get()
    {
      var requestTokenInfo = _tinyOAuth.GetRequestTokenAsync().Result;

      var authorizationUrl = _tinyOAuth.GetAuthorizationUrl(requestTokenInfo.RequestToken);

      return Redirect(authorizationUrl);
    }

    [HttpGet("callback")]
    public async Task<IActionResult> CallbackHandler(string oauth_token)
    {
      var isuses = await _jiraApi.GetIssue("NFER-10", oauth_token);
      _oauth_token = oauth_token;

      return Redirect("http://localhost:3000");
    }

    [HttpGet("issue/{id}")]
    public async Task<IActionResult> GetIssueById(string id)
    {
      Issue issue = await _jiraApi.GetIssue(id, _oauth_token);

      return Json(issue);
    }
  }
}
