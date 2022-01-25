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

namespace ContactFormHttpFunction
{
    public static class ContactFormHttpFunction
    {
        [FunctionName("ContactFormHttpFunction")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            string json = await req.ReadAsStringAsync();
            MessageDto message = JsonConvert.DeserializeObject<MessageDto>(json);
            message.Id = Guid.NewGuid();

            string responseMessage = "OK: " + json;

            return new OkObjectResult(responseMessage);
        }
    }
}

