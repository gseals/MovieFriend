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
    }
}
