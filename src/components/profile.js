/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useSelector } from 'react-redux';



// const customStyles = {
//   overlay: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     width: 930,
//     height: 600,
//     // backgroundColor: 'rgba(255, 255, 255, 0.75)',
//   },
// };

export default function Profile() {
  const profile = useSelector((state) => state.profiles.items);
  return (

    <div id="profile__header">
        {profile.map((item) => (
          <div>
            <div className="profile__username">{item.username}</div>
            {/* <div id="userinfo"></div> */}
            <div className="profile__stats">
              <span class="profile__stat-number">312</span> posts
            </div>
            <div className="profile__stats">
        <span class="profile__stat-number">{item.follower}</span> followers
            </div>
            <div className="profile__stats">
        <span class="profile__stat-number">{item.following}</span> following
            </div>
          </div>
        ))}
    </div>    
  );
}
