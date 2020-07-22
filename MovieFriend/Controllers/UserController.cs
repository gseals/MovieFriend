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

        // api/moviefriend/OsiM38S0luW81im2RDGpwQtYiKo1
        [HttpGet("users/{firebaseUid}/")]
        public IActionResult GetUserByFirebaseUid(string firebaseUid)
        {
            var specificUser = _repository.GetUserByFirebaseUid(firebaseUid);

            return Ok(specificUser);
        }
    }
}