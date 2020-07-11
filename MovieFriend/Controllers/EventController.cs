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
    public class EventController : ControllerBase
    {
        EventRepository _repository;

        public EventController(EventRepository repository)
        {
            _repository = repository;
        }
        // get all event
        [HttpGet("events/all/")]
        public IActionResult GetAllEvents()
        {
            var events = _repository.GetAllEvents();

            return Ok(events);
        }
    }
}