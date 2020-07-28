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
    public class InviteRepository
    {
        string ConnectionString;

        public InviteRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("MovieFriends");
        }
        public IEnumerable<Invite> GetAllInvites()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<Invite>("SELECT * FROM Invite");
            }
        }
        public Invite CreateInvite(int userId, int EventId)
        {
            var parameters = new { UserId = userId, EventId = EventId };

            var sql = @"INSERT INTO [Invite]([UserId], [EventId])
                       VALUES(@userId, @EventId)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Invite>(sql, parameters);
                return result;
            }
        }
    }
}
