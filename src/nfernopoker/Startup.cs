using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using TinyOAuth1;
using RestSharp;
using nfernopoker.Domain.Apis;
using nfernopoker.Domain.Services;

namespace nfernopoker
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc();

      // In production, the React files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "ClientApp/build";
      });

      using (var reader = File.OpenText("jira_privatekey.pem"))
      {
        var config = new TinyOAuthConfig
        {
          AccessTokenUrl = "http://localhost:8080/plugins/servlet/oauth/access-token",
          AuthorizeTokenUrl = "http://localhost:8080/plugins/servlet/oauth/authorize",
          RequestTokenUrl = "http://localhost:8080/plugins/servlet/oauth/request-token",
          ConsumerKey = "nfernopoker2",
          ConsumerSecret = "nfernopoker2",
          SignatureMethod = "RSA-SHA1",
          SigningKey = reader.ReadToEnd()
        };

        services.AddSingleton<ITinyOAuth>(sp => new TinyOAuth(config));
      }

      string baseAddress = "http://localhost:8080/rest/api/2";

      services.AddSingleton<IRestClientFactory>(sp => new RestClientFactory());

      services.AddSingleton<IJiraApi>(sp => new JiraApi(sp.GetService<IRestClientFactory>(), baseAddress));
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Home/Error");
      }

      app.UseStaticFiles();
      app.UseSpaStaticFiles();

      app.UseMvc();

      app.UseSpa(spa =>
      {
        spa.Options.SourcePath = "ClientApp";

        if (env.IsDevelopment())
        {
          spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
        }
      });
    }
  }
}
