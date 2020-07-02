import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
// import Search from './Search';

const Navigation = ({handleInput}) => {
  return (
    <div className="nav">
      <div id="logo"><Link to="/feed">WorkLikeThis</Link></div>
      {/* <input type="text" placeholder="Search by work..."></input> */}
      {/* <div className="search">
        <Search handleInput = {handleInput}/>      
      </div> */}
      <ul>
        <li><Link to="/feed">Home</Link></li>
        <li><Link to="/dm">DM</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/addFeed">add Feed</Link></li>
      </ul>
    </div>
  );
}

export default Navigation;
