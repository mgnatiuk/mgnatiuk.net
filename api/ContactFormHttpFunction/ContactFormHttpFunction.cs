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
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]
            HttpRequest req,
            ILogger log)
        {
            MessageDto dto = await GetMessageDto(req);

            string body = GenerateMessage(dto);

            await ConfigureTelegramBot(body);

            return new OkObjectResult(body);
        }

        private static async Task ConfigureTelegramBot(string body)
        {
            var botClient = new TelegramBotClient(Environment.GetEnvironmentVariable("TELEGRAM_BOT_TOKEN"));

            await botClient.SendTextMessageAsync(
                chatId: long.Parse(Environment.GetEnvironmentVariable("TELEGRAM_CHAT_ID")),
                text: body);
        }

        private static string GenerateMessage(MessageDto dto)
        {
            string message = $"👤 NEW MESSAGE FROM\n{dto.Name} ({dto.Email})\n\n📍 SUBJECT: \n{dto.Subject}\n\n📧 MESSAGE:\n{dto.Message}";

            return message;
        }

        private static async Task<MessageDto> GetMessageDto(HttpRequest request)
        {
            string requestBody = await new StreamReader(request.Body).ReadToEndAsync();

            MessageDto dto = JsonConvert.DeserializeObject<MessageDto>(requestBody);

            return dto;
        }
    }
}

