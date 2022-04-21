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
            ILogger logger)
        {
            try
            {
                MessageDto dto = await GetMessageDtoFromRequest(req);

                string body = GenerateMessageBody(dto);

                TelegramBotClient botClient = ConfigureTelegramBotClient(body);

                await SendMessageToBot(body, botClient);

                return new OkObjectResult(body);
            }
            catch (Exception exception)
            {
                logger.LogError($"Error: {exception.Message}");
                return new BadRequestObjectResult(exception.Message);
            }
        }

        private static TelegramBotClient ConfigureTelegramBotClient(string body)
        {
            var botClient = new TelegramBotClient(Environment.GetEnvironmentVariable("TELEGRAM_BOT_TOKEN"));

            return botClient;
            
        }

        private static async Task SendMessageToBot(string body, TelegramBotClient botClient)
        {
            long chatId = 0;
            long.TryParse(Environment.GetEnvironmentVariable("TELEGRAM_CHAT_ID"), out chatId);

            await botClient.SendTextMessageAsync(
                            chatId: chatId,
                            text: body);
        }

        private static string GenerateMessageBody(MessageDto dto)
        {
            string message = $"👤 NEW MESSAGE FROM\n{dto.Name} ({dto.Email})\n\n📍 SUBJECT: \n{dto.Subject}\n\n📧 MESSAGE:\n{dto.Message}";

            return message;
        }

        private static async Task<MessageDto> GetMessageDtoFromRequest(HttpRequest request)
        {
            string requestBody = await new StreamReader(request.Body).ReadToEndAsync();

            MessageDto dto = JsonConvert.DeserializeObject<MessageDto>(requestBody);

            return dto;
        }
    }
}

