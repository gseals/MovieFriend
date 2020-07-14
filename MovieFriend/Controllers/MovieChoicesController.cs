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
    public class MovieChoicesController : ControllerBase
    {
        MovieChoicesRepository _repository;
        public MovieChoicesController(MovieChoicesRepository repository)
        {
            _repository = repository;
        }
        // get all movieChoices
        [HttpGet("moviechoices/all/")]
        public IActionResult GetAllMovieChoices()
        {
            var moviechoices = _repository.GetAllMovieChoices();

            return Ok(moviechoices);
        }
    }
}