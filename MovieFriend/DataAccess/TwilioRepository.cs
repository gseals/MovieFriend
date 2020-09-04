using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace MovieFriend.DataAccess
{
    public class TwilioRepository
    {
        private string _apiKey;

        public TwilioRepository(IConfiguration configuration)
        {
            _apiKey = configuration["API_KEYS:SendGrid"].ToString();
        }

        public void Other(string emailAddress, string movieTitle)
        {
            Execute(emailAddress, movieTitle).Wait();
        }
        async Task Execute(string emailAddress, string movieTitle)
        {
            var client = new SendGridClient(_apiKey);
            var from = new EmailAddress("gabriel.seals@belmont.edu", "Movie Friend");
            var subject = "MovieFriend Alert";
            var to = new EmailAddress(emailAddress, "Johnny Test");
            var plainTextContent = movieTitle + "and easy to do anywhere, even with C#";
            var htmlContent = movieTitle + "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
            var x = response;
        }
    }
}
