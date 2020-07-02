import axios from 'axios';


// URL 로 습득  http://localhost:5000/feeds/timeline?page=1&limit=6 , POST data = userId
const token = localStorage.getItem('myJWT');
export const getProfiles = (items) => axios.get('http://localhost:5001/api/v1/profile', { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
export const getProfilesFollwer = (items) => axios.get('http://localhost:5001/api/v1/profile/follower', { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
export const getProfilesFollowing = (items) => axios.et('http://localhost:5001/api/v1/profile/following', { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });


