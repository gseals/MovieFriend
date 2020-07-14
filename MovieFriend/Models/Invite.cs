using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieFriend.Models
{
    public class Invite
    {
        public int InviteId { get; set; }
        public int UserId { get; set; }
        public int EventId { get; set; }
    }
}
