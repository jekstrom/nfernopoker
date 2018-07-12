using RestSharp;
using System;
using System.Collections.Generic;
using System.Text;

namespace nfernopoker.Domain.Services
{
  public interface IRestClientFactory
  {
    IRestClient CreateRestClient(string baseAddress);
  }
}
