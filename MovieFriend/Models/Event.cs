using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieFriend.Models
{
    public class Event
    {
        public int EventId { get; set; }
        public int MovieId { get; set; }
        public int HostId { get; set; }
        public DateTime DateTime { get; set; }
        public string Location { get; set; }
        public DateTime DateEventCreated { get; set; }
        public string Notes { get; set; }
    }
}
