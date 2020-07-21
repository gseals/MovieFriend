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

        public IEnumerable<EventView> GetEventByEventId(int eventId)
        {
            var sql = @"SELECT Movie.MovieTitle, Movie.MoviePoster, [User].FirstName, [User].LastName, Event.[DateTime], Event.[Location], Event.[DateEventCreated], Event.Notes
                        FROM Event
                        JOIN Movie on Movie.MovieId = Event.MovieId
                        JOIN [User] on [User].UserId = Event.HostId
                        WHERE Event.EventId = @eventId";

            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { eventId = eventId };
                var result = db.Query<EventView>(sql, parameters);
                return result;
            }
        }

    }
}
