using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieFriend.Models
{
    public class Movie
    {
        public int MovieId { get; set; }
        public string MovieDBId { get; set; }
        public string MovieTitle { get; set; }
        public string MoviePoster { get; set; }
    }
}
