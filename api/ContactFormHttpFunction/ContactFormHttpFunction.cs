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
using Telegram.Bot.Types;

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

            string body = $"👤 NEW MESSAGE FROM\n{message.Name} ({message.Email})\n\n📍 SUBJECT: \n{message.Subject}\n\n📧 MESSAGE:\n{message.Message}";

            var botClient = new TelegramBotClient(Environment.GetEnvironmentVariable("TELEGRAM_BOT_TOKEN"));

            await botClient.SendTextMessageAsync(
                chatId: Environment.GetEnvironmentVariable("TELEGRAM_CHAT_ID"),
                text: body);

            return new OkObjectResult(body);
        }
    }
}

