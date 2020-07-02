/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './Feed.css';
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
const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
  width: 600px;
  height: 600px;
`;

// const thumbsContainer = {
//   display: 'flex',
//   flexDirection: 'row',
//   flexWrap: 'wrap',
//   marginTop: 16,
// };

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};


export default function Addfeed(props) {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState('');
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file),
      })));
    },
  });


  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));
  const uploadImage = () => axios.get('http://localhost:5000/upload', {
    params: {
      filename: files[0].name,
      filetype: files[0].type,
    },
  }).then((res) => {
    const options = {
      headers: {
        'Content-Type': files.type,
      },
    };
    const items = { content, image: res.data.url };
    dispatch({ type: 'create_feed_request', items });
    return axios.put(res.data.url, files, options);
  }).then((res) => {
    const { name } = res.config.data;
    return {
      name,
      isUploading: true,
      url: `https://testsnh1003.s3.amazonaws.com/${files.name}`,
    };
  })
    .catch((e) => console.error(e));

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="addContent" style={{ width: 930, height: 630 }}>
      <div className="container" style={{ position: "absolute" }}>
        <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
          <input {...getInputProps()} />
          <p className="addP">파일을 드래그하거나 클릭해주세요!</p>
          {thumbs}
        </Container>
      </div>
      <ul className="addUl">
        <li>
          <div>
            <h1 className="addH">Comments</h1>
            <textarea name="content" cols="40" rows="8" placeholder="Comment in here..."
              className="submitbox"
              onChange={handleChange}
              style={{ width: 330, height: 475, borderRadius: 0 }}
            />
          </div>
          <button
            className="submit-btn"
            id="addSubmit"
            type="submit"
            onClick={() => {
              console.log({ files });
              uploadImage();
            }}
          >
            Add
          </button>
        </li>
      </ul>
    </div>
  );
}
