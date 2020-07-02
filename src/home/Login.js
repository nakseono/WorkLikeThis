// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import './styles.css';

axios.defaults.withCredentials = true;
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch({ type: 'login_request', items: { email, password } });
  };


  const responseGoogle = (e) => {
    axios
    // .post('http://localhost:5001/api/v1/social/signin', {
    //   headers: { 'Content-Type': 'application/json' },
    //   id_token: e.tokenId,
    // })
      .post('http://localhost:5001/api/v1/social/signin', {
        headers: { 'Content-Type': 'application/json' },
        access_token: e.accessToken,
        id_token: e.tokenId,
        expires_in: e.tokenObj.expires_in,
        token_type: e.tokenObj.token_type,
        scope: e.tokenObj.scope,
      })
      .then((res) => {
        if (res.status === 205 || res.status === 200) {
          alert('로그인 되었습니다.');
          console.log('구글 로그인 성공');
          history.push('/feed');
        } else {
          alert('아이디 혹은 비밀번호를 확인하세요.');
        }
      })
      .catch((err) => console.log(err));
  };
  const responseFail = (err) => {
    console.error(err);
  };
  return (
    <div className="login-form">
      <h1 className="title">WorkLikeThis</h1>
      <form>
        <input
          className="text-fileld"
          type="email"
          placeholder="Email"
          onChange={handleEmail}
        />
        <input
          className="text-fileld"
          type="password"
          placeholder="Password"
          onChange={handlePassword}
        />
        <>
          <button className="submit-btn" type="submit" onClick={handleSubmit}>로그인</button>
        </>
        <div className="hr-sect">OR</div>
        <div id="google">
          <GoogleLogin
            clientId="218335547664-1mb1k2mnh9csgcnlaccifikmmavqlo9l.apps.googleusercontent.com"
            render={(renderProps) => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Google로 로그인하기</button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseFail}
            cookiePolicy="single_host_origin"
          />
        </div>
        {/* link to find password page */}
        <div className="links">
          <Link to="URL" className="links">비밀번호를 잊으셨나요?</Link>
        </div>
        <div className="links">
          <Link to="/signup">계정이 없으시다면? 가입하기!</Link>
        </div>
      </form>
    </div>
  );
}
