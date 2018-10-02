using nfernopoker.Domain.Models;
using nfernopoker.Domain.Services;
using RestSharp;
using System;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace nfernopoker.Domain.Apis
{
  public class JiraApi : IJiraApi
  {
    private readonly IRestClientFactory _restClientFactory;
    private string _baseAddress;

    public JiraApi(IRestClientFactory restClientFactory, string baseAddress)
    {
      _restClientFactory = restClientFactory ?? throw new ArgumentNullException(nameof(restClientFactory));
      _baseAddress = !String.IsNullOrEmpty(baseAddress) ? baseAddress : throw new ArgumentException($"{nameof(baseAddress)} cannot be empty.");
    }

    public async Task<Issue> GetIssue(string issueId, AuthenticationHeaderValue authenticationHeader)
    {
      IRestClient client = _restClientFactory.CreateRestClient(_baseAddress);

      var request = new RestRequest($"issue/{issueId}");
      request.AddHeader("Authorization", $"OAuth {authenticationHeader.Parameter}");
      
      IRestResponse result = await client.ExecuteGetTaskAsync(request);

      return new Issue();
    }
  }
}
