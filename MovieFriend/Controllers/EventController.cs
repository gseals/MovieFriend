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
        InviteRepository _inviteRepository;
        MovieRepository _movieRepository;

        public EventController(EventRepository repository, InviteRepository inviteRepository, MovieRepository movieRepository)
        {
            _repository = repository;
            _inviteRepository = inviteRepository;
            _movieRepository = movieRepository;
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
        // get events by host id
        [HttpGet("events/host/{userId}/")]
        public IActionResult GetEventsByHostId(int userId)
        {
            var hostEvents = _repository.GetEventsByHostId(userId);

            return Ok(hostEvents);
        }
        // create events
        [HttpPost("events/")]
        public IActionResult CreateEvent(NewEventWithInvites NewEvent)
        {
            var newMovie = _movieRepository.CreateMovie(NewEvent);
            var newCreatedEvent = _repository.CreateEvent(NewEvent, newMovie.MovieId);
            foreach(var userId in NewEvent.InvitedUsers)
            {
                _inviteRepository.CreateInvite(userId, newCreatedEvent.EventId);
            }
            return Ok(newCreatedEvent);
        }
    }
}