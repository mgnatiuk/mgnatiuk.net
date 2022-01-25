using System;
using System.ComponentModel.DataAnnotations;

namespace ContactFormHttpFunction.dto
{
	public class MessageDto
	{
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Message { get; set; }
    }
}

