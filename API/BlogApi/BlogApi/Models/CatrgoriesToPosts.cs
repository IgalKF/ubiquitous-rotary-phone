using System;
using System.Collections.Generic;

namespace BlogApi.Models
{
    public partial class CategoriesToPosts
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int CategoryId { get; set; }
    }
}
