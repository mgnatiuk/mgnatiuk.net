using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace ContactFormHttpFunction.dto
{
	public class MessageDto
	{
        public Guid? Id { get; set; }

        [Required]
        [JsonProperty("name")]
        public string Name { get; set; }

        [Required]
        [JsonProperty("email")]
        public string Email { get; set; }

        [Required]
        [JsonProperty("subject")]
        public string Subject { get; set; }

        [Required]
        [JsonProperty("message")]
        public string Message { get; set; }
    }
}

