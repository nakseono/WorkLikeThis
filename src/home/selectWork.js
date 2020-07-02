import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link, Route, withRouter } from 'react-router-dom';
import axios from 'axios';

import './styles.css';

axios.defaults.withCredentials = true;

export default function Login() {
  const [firstLike, setFirst] = useState('');
  const [secondLike, setSecond] = useState('');
  const [thirdLike, setThird] = useState('');

  return (
    <div className="login-form">
      <h1 className="title selectwork">Tell us what you like</h1>
      <span id="subtitle">관심있는 직업이 있으면 입력해주세요.</span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return axios
            .post('URL', {
              firstLike,
              secondLike,
              thirdLike,
            })
            .then(() => {
              this.props.history.push('/');
            })
            .catch((err) => console.log(err));
        }}
      >
          
            <input
              className="text-fileld selectwork"
              type="email"
              placeholder="1. front end"
              onChange={setFirst}
            />
          
            <input
              className="text-fileld selectwork"
              type="name"
              placeholder="2. back end"
              onChange={setSecond}
            />
          
            <input
              className="text-fileld selectwork"
              type="username"
              placeholder="3. full stack"
              onChange={setThird}
            />
        
        <div className="links">
          <Link to="/homeFeed">직업 구경하러 가기</Link>
        </div>
      </form>
    
    </div>
  );
}
