using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlogApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CategoriesController : Controller
    {

        private readonly BlogContext _context;
        public CategoriesController(BlogContext blogContext)
        {
            _context = blogContext;
            if (_context.Posts.Count() == 0)
            {
                _context.Posts.Add(new Posts { Content = "Item1" });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public IQueryable Get()
        {
            return _context.Categories.Select(c=>c);
        }
        
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var category = new Categories { Id = id };
            _context.Categories.Remove(category);
            _context.CatrgoriesToPosts.RemoveRange(_context.CatrgoriesToPosts.Where(ctp=>ctp.CategoryId == id));
            _context.SaveChanges();
        }
    }
}
