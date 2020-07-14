using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using MovieFriend.Models;
using Dapper;

namespace MovieFriend.DataAccess
{
    public class MovieRepository
    {
        string ConnectionString;
        public MovieRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("MovieFriends");
        }
        public IEnumerable<Movie> GetAllMovies()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<Movie>("SELECT * FROM Movie");
            }
        }
    }
}
