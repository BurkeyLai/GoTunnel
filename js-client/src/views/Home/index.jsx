import React, { useState } from 'react';
import { Link } from 'react-router-dom';


//import brownDogImage from '../../images/dog-1.png';
//import blackDogImage from '../../images/dog-2.png';
//import blackWhiteDogImage from '../../images/dog-3.png';
//import brownWhiteDogImage from '../../images/dog-4.png';
//import brownCatImage from '../../images/cat-1.png';
//import blackWhiteCatImage from '../../images/cat-2.png';
//import orangeCatImage from '../../images/cat-3.png';
//import blackCatImage from '../../images/cat-4.png';
//
//import brownDogAvatar from '../../images/small/dog-1.png';
//import blackDogAvatar from '../../images/small/dog-2.png';
//import blackWhiteDogAvatar from '../../images/small/dog-3.png';
//import brownWhiteDogAvatar from '../../images/small/dog-4.png';
//import brownCatAvatar from '../../images/small/cat-1.png';
//import blackWhiteCatAvatar from '../../images/small/cat-2.png';
//import orangeCatAvatar from '../../images/small/cat-3.png';
//import blackCatAvatar from '../../images/small/cat-4.png';

import './index.scss';

//import SwitchButton from '../../components/join/SwitchButton';
//import RoleCard from '../../components/join/RoleCard';

//const roles = {
//  cats: [brownCatImage, blackWhiteCatImage, orangeCatImage, blackCatImage],
//  dogs: [brownDogImage, blackDogImage, blackWhiteDogImage, brownWhiteDogImage],
//};

//const avatars = {
//  cats: [brownCatAvatar, blackWhiteCatAvatar, orangeCatAvatar, blackCatAvatar],
//  dogs: [
//    brownDogAvatar,
//    blackDogAvatar,
//    blackWhiteDogAvatar,
//    brownWhiteDogAvatar,
//  ],
//};

const setLocalStorage = (userInfo) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

const Home = () => {
  //const [roleType, setRoleType] = useState('dogs');
  //const [roleIndex, setRoleIndex] = useState(0);
  const [channelType, setChannelType] = useState('Normal');
  const [username, setUsername] = useState('');

  //const chooseRole = (i) => {
  //  return () => {
  //    setRoleIndex(i);
  //  };
  //};

  const submitHandler = (e) => {
    if (username) {
      var userInfo = [{
        username: username,
        userchannel: channelType,
      }];
      setLocalStorage(userInfo);
    } else {
      //e.preventDefault();
    }

    
  };

  return (
    
    <main className="main_join">
      <form className="setting_card" onSubmit={(e) => e.preventDefault()}>
        <div className="buttons"></div>
        <div className="setting_card_main">
          <h1 className="brand">GoTunnel</h1>
          {/*<img className="role" src={roles[roleType][roleIndex]} alt="role" />*/}
          <input
            className="input_username"
            type="text"
            placeholder="????????????"
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <Link onClick={submitHandler} to={`/chat`} className="button_enter">
            ????????????
          </Link>
        
        </div>
        <div>
          {/*roles[roleType].map((item, i) => {
            return (
              <RoleCard
                key={i}
                image={item}
                isActive={item === roles[roleType][roleIndex]}
                onClick={chooseRole(i)}
              />
            );
          })*/}
        </div>
      </form>

      {/*
      <form action="/names" method="POST">
        <p>Input your name</p>
        <input
            className="input_username"
            type="text"
            name="username"
            placeholder="????????????"
            onChange={(e) => setUsername(e.target.value)}
        />
        <input type="submit" value="??????"/>
      </form>
      */}
    </main>
  );
};

export default Home;
