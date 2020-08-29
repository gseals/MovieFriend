using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieFriend.Models
{
    public class EventView
    {
        public DateTime DateTime { get; set; }
        public string Location { get; set; }
        public DateTime DateEventCreated { get; set; }
        public string Notes { get; set; }
        public int MovieId { get; set; }
        public string MovieTitle { get; set; }
        public string MoviePoster { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<User> InvitedUsers { get; set; }
    }
}
