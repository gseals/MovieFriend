using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MovieFriend.DataAccess;
using MovieFriend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MovieFriend.Controllers
{
    [Route("api/moviefriend")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        MovieRepository _repository;
        public MovieController(MovieRepository repository)
        {
            _repository = repository;
        }
        // get all movies
        [HttpGet("movies/all/")]
        public IActionResult GetAllMovies()
        {
            var movies = _repository.GetAllMovies();

            return Ok(movies);
        }
    }
}