using BlogApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BlogApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class PostsController : Controller
    {
        private readonly BlogContext _context;
        public PostsController(BlogContext blogContext)
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
                var p = _context.Posts
                    .Select(pc => new
                    {
                        pc.Id,
                        pc.Title,
                        pc.Content,
                        pc.BlogId,
                        categories = _context.CatrgoriesToPosts
                        .Join(_context.Categories, ctp => ctp.CategoryId, c => c.Id, (ctp, c) => new { ctp.PostId, c.Name })
                        .Where(cctp => cctp.PostId == pc.Categories)
                        .Select(names => new { category = string.Join(", ", names.Name) })
                    });
                return p;
            }

            else
                return _context.Posts
                    .Where(p => p.Id == id)
                    .Select(pc => new {
                        pc.Id,
                        pc.Title,
                        pc.Content,
                        pc.BlogId,
                        categories = _context.CatrgoriesToPosts
                        .Join(_context.Categories, ctp => ctp.CategoryId, c => c.Id, (ctp, c) => new { ctp.PostId, c.Name })
                        .Where(cctp => cctp.PostId == pc.Categories)
                        .Select(names => new { category = string.Join(", ", names.Name) })
                    });
        }

        [HttpPost]
        public IActionResult Post([FromBody]TempPost post)
        {
            if (ModelState.IsValid)
            {
                var maxCategories = _context.Posts.Max(p => p.Categories);
                maxCategories = maxCategories == null ? 1 :
                maxCategories + 1;
                _context.Posts.Add(new Posts { Categories = maxCategories, Content = post.content, Title = post.title, BlogId = post.blogid });
                _context.SaveChanges();
                var categories = post.categories.Split(',');
                List<int> ids = new List<int>();
                foreach (var category in categories)
                {
                    if (!_context.Categories.Any(c => c.Name.Equals(category)))
                    {
                        var catEntity = new Categories { Name = category };
                        _context.Categories.Add(catEntity);
                        _context.SaveChanges();
                        ids.Add(catEntity.Id);
                    }
                }
                foreach (var id in ids)
                {
                    _context.CatrgoriesToPosts.Add(new CategoriesToPosts { PostId = Convert.ToInt32(maxCategories), CategoryId = id });
                    _context.SaveChanges();
                }

                return CreatedAtAction("Get","New Post Was Created");
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var post = new Posts { Id = id };
            _context.Posts.Remove(post);
            var deletables =_context.CatrgoriesToPosts.Where(ctp => ctp.PostId == id);
            _context.CatrgoriesToPosts.RemoveRange(deletables);
            _context.SaveChanges();
        }
    }
}