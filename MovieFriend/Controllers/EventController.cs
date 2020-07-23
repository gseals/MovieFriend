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
        // get all events
        [HttpGet("events/all/")]
        public IActionResult GetAllEvents()
        {
            var events = _repository.GetAllEvents();

            return Ok(events);
        }

        // get events by event id
        [HttpGet("events/{eventId}/")]
        public IActionResult GetEventByEventId(int eventId)
        {
            var theseEvents = _repository.GetEventByEventId(eventId);

            return Ok(theseEvents);
        }
        // get events by user id
        [HttpGet("events/user/{userId}/")]
        public IActionResult GetEventsByUserId(int userId)
        {
            var userEvents = _repository.GetEventsByUserId(userId);

            return Ok(userEvents);
        }
    }
}