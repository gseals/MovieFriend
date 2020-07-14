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
    public class MovieChoicesRepository
    {
        string ConnectionString;
        public MovieChoicesRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("MovieFriends");
        }
        public IEnumerable<MovieChoices> GetAllMovieChoices()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<MovieChoices>("SELECT * FROM MovieChoices");
            }
        }
    }
}
