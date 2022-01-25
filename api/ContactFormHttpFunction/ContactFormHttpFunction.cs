using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ContactFormHttpFunction.dto;
using Telegram.Bot;

namespace ContactFormHttpFunction
{
    public static class ContactFormHttpFunction
    {
        [FunctionName("ContactFormHttpFunction")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req, ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            MessageDto message = JsonConvert.DeserializeObject<MessageDto>(requestBody);
            message.Id = Guid.NewGuid();

            string telegramBotToken = "5190646778:AAGrG9mYpvRE9SSU8wfNmlrxqVy7i9MixYg";

            var botClient = new TelegramBotClient(telegramBotToken);

            //var me = await botClient.GetMeAsync();
            Console.WriteLine($"Hello, World! I am user {message.Id} and my name is {message.Name}.");


            //string json = await req.ReadAsStringAsync();
            //MessageDto message = JsonConvert.DeserializeObject<MessageDto>(json) ?? new MessageDto();
            //message.Id = Guid.NewGuid();

            string responseMessage = "OK: " + requestBody;

            return new OkObjectResult(responseMessage);
        }
    }
}

