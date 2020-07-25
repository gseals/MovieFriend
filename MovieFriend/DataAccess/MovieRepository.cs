﻿using Microsoft.Extensions.Configuration;
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
        public Movie CreateMovie(NewEventWithInvites NewEvent)
        {
            var sql = @"INSERT INTO [Movie](MovieTitle, MoviePoster, MovieDBId)
                       VALUES(@MovieTitle, @MoviePoster, @MovieDBId)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Movie>(sql, NewEvent);
                return result;
            }
        }
    }
}
