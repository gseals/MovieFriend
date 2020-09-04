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
        EventRepository _eventRepository;
        InviteRepository _inviteRepository;
        MovieRepository _movieRepository;
        TwilioRepository _twilioRepository;
        UserRepository _userRepository;

        public EventController(EventRepository repository, InviteRepository inviteRepository, MovieRepository movieRepository, TwilioRepository twilioRepository, UserRepository userRepository)
        {
            _eventRepository = repository;
            _inviteRepository = inviteRepository;
            _movieRepository = movieRepository;
            _twilioRepository = twilioRepository;
            _userRepository = userRepository;
        }
        // get all events
        [HttpGet("events/all/")]
        public IActionResult GetAllEvents()
        {
            var events = _eventRepository.GetAllEvents();

            return Ok(events);
        }

        // get events by event id
        [HttpGet("events/{eventId}/")]
        public IActionResult GetEventByEventId(int eventId)
        {
            var myEvent = _eventRepository.GetEventByEventId(eventId);
            var invitees = _inviteRepository.GetInvitesForEvent(eventId);
            myEvent.InvitedUsers = invitees;

            var listOfEvent = new List<EventView> { myEvent }; // this is a hack

            return Ok(listOfEvent);
        }
        // get events by user id
        [HttpGet("events/user/{userId}/")]
        public IActionResult GetEventsByUserId(int userId)
        {
            var userEvents = _eventRepository.GetEventsByUserId(userId);

            return Ok(userEvents);
        }
        // get events by host id
        [HttpGet("events/host/{userId}/")]
        public IActionResult GetEventsByHostId(int userId)
        {
            var hostEvents = _eventRepository.GetEventsByHostId(userId);

            return Ok(hostEvents);
        }
        // create events
        [HttpPost("events/")]
        public IActionResult CreateEvent(NewEventWithInvites NewEvent)
        {
            var newMovie = _movieRepository.CreateMovie(NewEvent);
            var newCreatedEvent = _eventRepository.CreateEvent(NewEvent, newMovie.MovieId);
            foreach (var userId in NewEvent.InvitedUsers)
            {
                _inviteRepository.CreateInvite(userId, newCreatedEvent.EventId);
                var emailAddress = _userRepository.GetEmail(userId);
                var movieTitle = _movieRepository.GetMovieTitle(newMovie.MovieId);
                _twilioRepository.Other(emailAddress, movieTitle);

            }
            return Ok(newCreatedEvent);
        }
        // delete event
        [HttpDelete("events/{eventId}")]
        public IActionResult DeleteEvent(int eventId)
        {
            var eventToDelete = _eventRepository.GetEventByEventId(eventId);

            _inviteRepository.DeleteInvite(eventId);
            _eventRepository.DeleteEvent(eventId);
            _movieRepository.DeleteMovie(eventToDelete.MovieId);
            return Ok(eventToDelete);
        }
    }
}