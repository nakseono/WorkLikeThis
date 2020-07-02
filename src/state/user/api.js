import axios from 'axios';

export const getUsers = () => axios.get('/users');
export const createUser = ({ name }) => axios.post('/users', {
  name,
});
export const deleteUser = (userId) => axios.delete(`/users/${userId}`);
export const loginUser = ({ items }) => axios.post('http://localhost:5001/api/v1/accounts/signin', items);
