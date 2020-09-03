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
    public class InviteController : ControllerBase
    {
        InviteRepository _repository;

        public InviteController(InviteRepository repository)
        {
            _repository = repository;
        }
        // get all invites
        [HttpGet("invites/all/")]
        public IActionResult GetAllInvites()
        {
            var invites = _repository.GetAllInvites();

            return Ok(invites);
        }
        [HttpDelete("invites/remove/{inviteId}")]
        public IActionResult DeleteInviteByInviteId(int inviteId)
        {
            _repository.DeleteInviteByInviteId(inviteId);
            return Ok();
        }
    }
}