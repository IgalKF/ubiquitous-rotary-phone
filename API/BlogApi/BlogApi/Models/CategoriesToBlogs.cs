using System;
using System.Collections.Generic;

namespace BlogApi.Models
{
    public partial class CategoriesToBlogs
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int BlogId { get; set; }
    }
}
