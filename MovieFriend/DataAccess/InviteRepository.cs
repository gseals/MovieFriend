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

        public void DeleteInvite(int eventId)
        {
            var sql = @"DELETE
                        FROM[Invite]
                        WHERE EventId = @eventId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { eventId = eventId };
                var result = db.Execute(sql, parameters);
                return;
            }
        }

        public List<User> GetInvitesForEvent(int eventId)
        {
            var sql = @"SELECT *
                        FROM[Invite]
                        JOIN[User] ON[User].UserId = Invite.UserId
                        WHERE EventId = @eventId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { eventId = eventId };
                var result = db.Query<User>(sql, parameters);
                return result.ToList();
            }
        }
        public void DeleteInviteByInviteId(int inviteId)
        {
            var sql = @"DELETE
                        FROM [Invite]
                        WHERE InviteId = @inviteId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { inviteId = inviteId };
                var result = db.Execute(sql, parameters);
                return;
            }
        }
    }
}
