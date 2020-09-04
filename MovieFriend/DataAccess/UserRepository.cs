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
    public class UserRepository
    {
        string ConnectionString;
        public UserRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("MovieFriends");
        }
        public IEnumerable<User> GetAllUsers()
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                return db.Query<User>("SELECT * FROM [User]");
            }
        }

        public User GetUserByFirebaseUid(string firebaseUid)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { FirebaseUid = firebaseUid };
                var Sql = "SELECT * FROM [User] where FirebaseUid = @firebaseUid";
                return db.QueryFirst<User>(Sql, parameters);
            }
        }
        public string GetEmail(int userId)
        {
            var sql = @"SELECT [User].Email
                        FROM [User]
                        WHERE [User].UserId = @userId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { userId = userId };
                var result = db.QueryFirstOrDefault<string>(sql, parameters);
                return result;
            }
        }
    }
}
