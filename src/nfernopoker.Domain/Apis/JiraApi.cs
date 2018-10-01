using nfernopoker.Domain.Models;
using nfernopoker.Domain.Services;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Text;
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

      // I probably have to sign this again... update tinyoauth1?


//      string authHeaderValues =
//        $@"
//OAuth oauth_token=""{accessToken}"",
//oauth_token_secret=""{accessTokenSecret}"",
//oauth_consumer_key=""nfernpoker2"",
//oauth_signature_method=""RSA-SHA1"",
//oauth_signature=""signature"",
//oauth_timestamp=""232324234"",
//oauth_nonce=""3490584235274523875423890572"",
//oauth_version=""1.1""";

      var request = new RestRequest($"issue/{issueId}");
      request.AddHeader("Authorization", $"OAuth {authenticationHeader.Parameter}");
      
      IRestResponse result = await client.ExecuteGetTaskAsync(request);

      return new Issue();
    }
  }
}
