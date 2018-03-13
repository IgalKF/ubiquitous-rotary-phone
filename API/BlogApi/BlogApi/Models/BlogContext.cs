using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BlogApi.Models
{
    public partial class BlogContext : DbContext
    {
        public virtual DbSet<Categories> Categories { get; set; }
        public virtual DbSet<CategoriesToPosts> CatrgoriesToPosts { get; set; }
        public virtual DbSet<Posts> Posts { get; set; }
        public virtual DbSet<Blogs> Blogs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=IGAL;Database=Blog;Trusted_Connection=True;");
            }
        }

        public BlogContext(DbContextOptions<BlogContext> options)
    : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categories>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<CategoriesToPosts>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.PostId).HasColumnName("PostID");
            });

            modelBuilder.Entity<Posts>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Content)
                    .HasColumnName("content")
                    .HasColumnType("text");

                entity.Property(e => e.Title).HasColumnType("text");
            });

            modelBuilder.Entity<Blogs>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Title).HasColumnType("text");

                entity.Property(e => e.PostId).HasColumnName("PostID");

                entity.Property(e => e.Categories).HasColumnName("Categories");

            });


        }
    }
}
