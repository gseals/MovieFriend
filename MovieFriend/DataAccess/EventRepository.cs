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
    public class EventRepository
    {
        string ConnectionString;

        public EventRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("MovieFriends");
        }
        public IEnumerable<Event> GetAllEvents()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<Event>("SELECT * FROM Event");
            }
        }
    }
}
