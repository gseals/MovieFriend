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
    public class UserController : ControllerBase
    {
        UserRepository _repository;

        public UserController(UserRepository repository)
        {
            _repository = repository;
        }
        // get all users
        [HttpGet("users/all/")]
        public IActionResult GetAllUsers()
        {
            var users = _repository.GetAllUsers();

            return Ok(users);
        }
    }
}