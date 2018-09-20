using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using nfernopoker.Domain.Apis;
using TinyOAuth1;

namespace nfernopoker.Controllers
{
  [Route("api/[controller]")]
  public class JiraController : Controller
  {
    private readonly IJiraApi _jiraApi;
    private readonly ITinyOAuth _tinyOAuth;

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
    public IActionResult CallbackHandler(string oauth_token)
    {
      var isuses = _jiraApi.GetIssue("NFER-10", oauth_token);

      return new JsonResult("test");
    }
  }
}
