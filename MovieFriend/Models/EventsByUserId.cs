﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieFriend.Models
{
    public class EventsByUserId
    {
        public int EventId { get; set; }
        public int MovieId { get; set; }
        public int HostId { get; set; }
        public DateTime DateTime { get; set; }
        public string Location { get; set; }
        public DateTime DateEventCreated { get; set; }
        public string Notes { get; set; }
        public int InviteId { get; set; }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateJoined { get; set; }
        public string MovieTitle { get; set; }
        public string MoviePoster { get; set; }
    }
}
