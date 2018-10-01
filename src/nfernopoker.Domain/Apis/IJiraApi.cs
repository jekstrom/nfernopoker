using nfernopoker.Domain.Models;
using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace nfernopoker.Domain.Apis
{
  public interface IJiraApi
  {
    Task<Issue> GetIssue(string issueId, AuthenticationHeaderValue authenticationHeader);
  }
}
