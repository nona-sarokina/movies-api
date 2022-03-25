#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MoviesApi;

namespace MoviesApi.Data
{
    public class MoviesApiContext : DbContext
    {
        public MoviesApiContext (DbContextOptions<MoviesApiContext> options)
            : base(options)
        {
        }

        public DbSet<MoviesApi.Movie> Movie { get; set; }
    }
}
