using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApi.Models
{
    public class TempPost
    {
        [Required]
        public string title { get; set; }
        [Required]
        public string content { get; set; }
        [Required]
        public string categories { get; set; }
        [Required]
        public int blogid { get; set; }
    }
}
