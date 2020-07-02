import axios from 'axios';


// URL 로 습득  http://localhost:5000/feeds/timeline?page=1&limit=6 , POST data = userId
const token = localStorage.getItem('myJWT');
export const getFeed = (items) => axios.get('http://localhost:5000/feeds/timeline?page=1&limit=6', { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
export const createFeed = (items) => {
  console.log(items);
  console.log(token);
  axios.post('http://localhost:5000/feeds/', JSON.stringify(items), { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
};
export const deleteFeed = (feedId) => axios.delete(`/URL/${feedId}`);
