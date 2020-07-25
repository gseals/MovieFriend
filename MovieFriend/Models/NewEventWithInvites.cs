using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieFriend.Models
{
    public class NewEventWithInvites
    {
        public int EventId { get; set; }
        public string MovieDBId { get; set; }
        public int HostId { get; set; }
        public DateTime DateTime { get; set; }
        public string Location { get; set; }
        public DateTime DateEventCreated { get; set; }
        public string Notes { get; set; }
        // this list receives an array of integers from the front end that represent users; each integer will be a userId
        public List<int> InvitedUsers{ get; set; }
        public string MovieTitle { get; set; }
        public string MoviePoster { get; set; }
    }
}
