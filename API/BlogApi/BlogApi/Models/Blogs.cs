using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BlogApi.Models
{
    public partial class Blogs
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        [Required(ErrorMessage = "You Must Enter a Title, Bro..")]
        public string Title { get; set; }
        public int Categories { get; set; }
    }
}
