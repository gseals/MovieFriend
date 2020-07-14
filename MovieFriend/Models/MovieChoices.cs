using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieFriend.Models
{
    public class MovieChoices
    {
        public int MovieChoiesId { get; set; }
        public int MovieId { get; set; }
        public int EventId { get; set; }
        public int Votes { get; set; }
    }
}
