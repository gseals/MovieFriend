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
        public IEnumerable<EventsByUserId> GetEventsByUserId(int userId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { UserId = userId };

                var Sql = @"SELECT *
                            FROM [Event]
                            JOIN Invite ON Event.EventId = Invite.EventId
                            JOIN [User] ON Invite.UserId = [User].UserId
                            JOIN Movie ON Event.MovieId = Movie.MovieId
                            WHERE [User].UserId = @userId";

                return db.Query<EventsByUserId>(Sql, parameters);
            }
        }
        public IEnumerable<EventsByHostId> GetEventsByHostId(int userId)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                var parameters = new { UserId = userId };

                var sql = @"SELECT*
                            FROM[Event]
                            JOIN[User] ON Event.HostId = [User].UserId
                            JOIN Movie ON Event.MovieId = Movie.MovieId
                            WHERE [User].UserId = @userId";

                return db.Query<EventsByHostId>(sql, parameters);
            }
        }
        public Event CreateEvent(NewEventWithInvites NewEvent, int movieId)
        {
            var parameters = new { movieId = movieId, HostId = NewEvent.HostId, DateTime = NewEvent.DateTime, Location = NewEvent.Location, Notes = NewEvent.Notes };
            var sql = @"INSERT INTO [Event](MovieId, HostId, [DateTime], Location, DateEventCreated, Notes)
                        OUTPUT INSERTED.*
                        VALUES(@MovieId, @HostId, @DateTime, @Location, getDate(), @Notes)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<Event>(sql, parameters);

                return result;
            }
        }
    }
}
