using System;
using System.Collections.Generic;

namespace BlogApi.Models
{
    public partial class Posts
    {
        public int Id { get; set; }
        public int BlogId { get; set; }
        public string Title { get; set; }
        public int? Categories { get; set; }
        public string Content { get; set; }
    }
}
