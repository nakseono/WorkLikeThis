/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import './Feed.css';

Modal.setAppElement('#root');
const customStyles = {
  overlay: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 930,
    height: 600,
    
    // backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
};

export default function Feed() {
  const feed = useSelector((state) => state.feeds.items);
  // const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    // <div className="img">
    //   {feed}
    //   <div className="mask" />
    //   {/* <img src="http://www.nikesh.me/image/01.jpg" /> */}
    // </div>
    <div className="feed-form">
      {feed.map((item) => (
        <div className="card-selector">
          <div className="feed-card">
            <div className="card__userImage">{item.userImage}</div>
            <div className="card__userName">{item.username}</div>
            <div className="card__content">
              {' '}
              {item.content}
            </div>
            <div className="card__userId">
              {item.userId}
              {' '}
            </div>

            {/* <img src={item.image} onClick={() => openModal()} /> */}
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={require('../img/page_1.jpg')} onClick={() => openModal()} style={{ width: 293, height: 241 }} />

          </div>
          {/* end of card-selector */}


          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
            <body>
              <div className="content">
                <img src={require('../img/page_1.jpg')} onClick={() => openModal()} style={{ width: 600, height: 600 }} />
              </div>
              <div className="right-card" style={{ width: 330, height: 600 }}>
                <div className="card__userImage">{item.userImage}</div>
                <div className="card__userName__modal">{item.username}</div>
                <div className="card__content__modal">
                  {/* {' enviroment'}
                {'auto cad, indesign, illustrator, photoshop'} */}
                  {item.content}
                </div>

              </div>

            </body>
          </Modal>
        </div>
      ))}
    </div>

  );
}
