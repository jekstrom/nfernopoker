using System;
using System.Collections.Generic;
using System.Text;
using RestSharp;

namespace nfernopoker.Domain.Services
{
  public class RestClientFactory : IRestClientFactory
  {
    public IRestClient CreateRestClient(string baseAddress)
    {
      return new RestClient(baseAddress);
    }
  }
}
