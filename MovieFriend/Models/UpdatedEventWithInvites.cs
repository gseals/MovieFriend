using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieFriend.Models
{
    public class UpdatedEventWithInvites
    {
        public int EventId { get; set; }
        public string MovieDBId { get; set; }
        public int HostId { get; set; }
        public DateTime DateTime { get; set; } // "2020-07-27 20:01:42" date and time of movie
        public string Location { get; set; }
        public DateTime DateEventCreated { get; set; }
        public string Notes { get; set; }
        // this list receives an array of integers from the front end that represent users; each integer will be a userId
        public List<int> InvitedUsers { get; set; } // [1, 2, 3, 4]
        public string MovieTitle { get; set; }
        public string MoviePoster { get; set; }
    }
}
