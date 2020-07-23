import axios from 'axios';

const getAllEvents = () => new Promise((resolve, reject) => {
  axios.get('https://localhost:44389/api/moviefriend/events/all')
    .then((result) => resolve(result.data))
    .catch((errorFromGetAllEvents) => reject(errorFromGetAllEvents));
});

const getEventsByEventId = (eventId) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44389/api/moviefriend/events/${eventId}`)
    .then((result) => resolve(result.data))
    .catch((errorGetEventsByEventId) => reject(errorGetEventsByEventId));
});

const getEventsByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`https://localhost:44389/api/moviefriend/events/user/${userId}`)
    .then((result) => resolve(result.data))
    .catch((errorGetEventsByUserId) => reject(errorGetEventsByUserId));
});

export default { getAllEvents, getEventsByEventId, getEventsByUserId };
