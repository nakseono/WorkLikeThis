import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link, Route, withRouter } from 'react-router-dom';
import axios from 'axios';

import './styles.css';

axios.defaults.withCredentials = true;

export default function Login() {
  const [email, setEmail] = useState('');
  // const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPw] = useState('');

  return (
      <div className="login-form">
          <h1 className="title">WorkLikeThis</h1>
          <span id="subtitle">보고싶은 직업이 있으면 가입하세요.</span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              return axios
                .post('http://localhost:5001/api/v1/accounts/signup', {
                  email,
                  // name,
                  username,
                  password,
                })
                .then(() => {
                  this.props.history.push('/');
                })
                .catch((err) => console.log(err));
            }}
          >
                <input
                  className="text-fileld"
                  type="email"
                  placeholder="Email"
                  onChange={setEmail}
                />
              
                {/* <input
                  className="text-fileld"
                  type="name"
                  placeholder="Name"
                  onChange={setName}
                /> */}

                <input
                 className="text-fileld"
                  type="username"
                  placeholder="Username"
                  onChange={setUsername}
                />
              
              <div>
                <input
                  className="text-fileld"
                  type="password"
                  placeholder="Password"
                  onChange={setPw}
                />
              </div>
            
            <button className="submit-btn" >확인</button>

            <div id="agreement">
              <p>
                가입하면 WorkLikeThis의 약관,
                데이터 정책 및 
              </p>
              <p>
                 쿠키 정책에 동의하게 됩니다.
              </p>
            </div>
          </form>
        
        <div className="links" >
          <Link to="/login">계정이 있으시면 로그인</Link>
        </div>
      </div>
  );
}