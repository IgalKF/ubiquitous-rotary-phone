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
    public class BlogsController : Controller
    {

        private readonly BlogContext _context;
        public BlogsController(BlogContext blogContext)
        {
            _context = blogContext;
            if (_context.Posts.Count() == 0)
            {
                _context.Posts.Add(new Posts { Content = "Item1" });
                _context.SaveChanges();
            }
        }

        [HttpGet("{id?}")]
        public IQueryable Get(int id)
        {
            if (id == 0)
            {
                return _context.Blogs.Select(b => b);
            }
            else
            {
                var p = _context.Posts
                    .Select(pc => new {
                        pc.Id,
                        pc.Title,
                        pc.Content,
                        pc.BlogId,
                        categories = _context.CatrgoriesToPosts
                        .Join(_context.Categories, ctp => ctp.CategoryId, c => c.Id, (ctp, c) => new { ctp.PostId, c.Name })
                        .Where(cctp => cctp.PostId == pc.Categories)
                        .Select(names => new { category = string.Join(", ", names.Name) })
                    }).Where(pcb => pcb.BlogId == id);
                return p;
            }
        }

        [HttpGet("getblog/{id}")]
        public IQueryable GetBlog(int id)
        {
            return _context.Blogs.Where(b => b.Id == id);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Blogs value)
        {
            if (ModelState.IsValid)
            {
                var blog = new Blogs
                {
                    Title = value.Title,
                    Categories = 0,
                    PostId = 0
                };
                _context.Blogs.Add(blog);
                _context.SaveChanges();
                return CreatedAtAction("Get", "Added The Blog!");
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var blog = new Blogs { Id = id };
            _context.Blogs.Remove(blog);
            _context.Posts.RemoveRange(_context.Posts.Where(p => p.BlogId == id));
            _context.SaveChanges();
        }
    }
}
