import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';

import { User, Channel, Connect, Message } from "../../service_pb";
import Home from '../Home';
import './index.scss';

//import Sidebar from '../../components/chat/Sidebar';
import MessagesBox from '../../components/chat/MessagesBox';
import Loading from '../../components/common/Loading';

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('userInfo'));
};

const setLocalStorage = (userInfo) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

const clearLocalStorage = () => {
  localStorage.clear();
};

const channel = new Channel();
const user = new User();
const connect = new Connect();

const Chat = ({ client }) => {
  let history = useHistory();
  const location = useLocation();
  
  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState('');
  const [messagesInfo, setMessagesInfo] = useState([]);
  const [userList, setUserList] = useState([]);
  const [chatTo, setChatTo] = useState(false);
  const [loading, setLoading] = useState(true);

  const { mode, room } = queryString.parse(location.search);

  useEffect(() => {
    const messageBox = document.querySelector('.messages');
    messageBox.scrollTop = messageBox.scrollHeight;
  }, [messagesInfo])

  useEffect(() => {
    const userInfoList = getLocalStorage();
    const userName = userInfoList[0].username;
    const userChannel = userInfoList[0].userchannel;
    //console.log(userInfoList);
    //console.log(userInfoList[0].Name);
    
    channel.setName(userChannel);
    user.setId(uuidv4());
    user.setName(userName);
    user.setChannel(channel);
    connect.setUser(user);
    connect.setActive(true);
    connect.setChannel(user.getChannel());

    var chatStream = client.createStream(connect, {});

    setUserInfo(...getLocalStorage());

    chatStream.on("data", (response) => {
      const id = response.getId();
      const username = response.getName();
      const messageContent = response.getContent();
      const timestamp = response.getTimestamp();
      const message = {
        type: 'text',
        content: messageContent,
        time: new Date().toLocaleTimeString(),
        //time: timestamp,
      }
      var isSystemMessage = false;

      console.log("sending friend msg:" + messageContent, " from:" + id);

      if (messageContent === "對方已經加入聊天室") {
        setChatTo(true);
        setLoading(false);
        isSystemMessage = true;
      } else if (messageContent === "對方已經離開聊天室") {
        setChatTo(false);
        isSystemMessage = true;
      }

      setMessagesInfo((messagesInfo) => [
        ...messagesInfo,
        //{ ...userInfo[0], isSystemMessage, message }
        { username, id, isSystemMessage, message }
      ]);

      /*
      if (from === username) {
        setMsgList((oldArray) => [
          ...oldArray,
          { from, msg, time, mine: true },
        ]);
      } else {
        setMsgList((oldArray) => [...oldArray, { from, msg, time }]);
      }
      */
    });

    chatStream.on("status", function (status) {
      console.log(status.code, status.details, status.metadata);
    });

    chatStream.on("end", () => {
      console.log("Stream ended.");
    });

    //client.createStream(connect, null, () => {
      //str = stream;


    //  console.log("createStream");
    //});
    /*
    socket.emit('joinRoom', {
      userInfo: { ...getLocalStorage() },
      roomInfo: { mode, room },
    });

    socket.on('receiveMessage', ({ userInfo, isSystemMessage, message }) => {
      setMessagesInfo((messagesInfo) => [
        ...messagesInfo,
        { ...userInfo, isSystemMessage, message },
      ]);
    });

    socket.on('receiveUserList', ({ userList }) => {
      setUserList(userList);
    });

    socket.on('receiveImage', ({ userInfo, isSystemMessage, message }) => {
      setMessagesInfo((messagesInfo) => [
        ...messagesInfo,
        { ...userInfo, isSystemMessage, message },
      ]);
    });

    socket.on('receiveUserInfoWithSocketId', (userInfo) => {
      setUserInfo(userInfo);
      setLocalStorage(userInfo);
    })
    */

    return () => {
      exitTunnel();
    }
  }, []);

  const exitTunnel = () => {
    const msg = new Message();
    msg.setId(user.getId());
    msg.setName(user.getName());
    msg.setContent("LEAVE");
    msg.setTimestamp(new Date().toLocaleTimeString());
    msg.setChannel(user.getChannel());
    client.broadcastMessage(msg, null, () => {

    });
    clearLocalStorage();
  }

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("send message: ", message);
    if (message) {
      const msg = new Message();
      msg.setId(user.getId());
      msg.setName(user.getName());
      msg.setContent(message);
      msg.setTimestamp(new Date().toLocaleTimeString());
      msg.setChannel(user.getChannel());
      client.broadcastMessage(msg, null, () => {
  
      });
      setMessage('');
    }
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        /*
        socket.emit('sendImage', {
            userInfo,
            roomInfo: { mode, room },
            message: {
            type: 'image',
            content: reader.result, // base64
            time: new Date().toLocaleTimeString(),
            },
        });
        */
    };
  };

  return (
    <main className="chatroom">
      {chatTo ?
        <Prompt
          when={true}
          message="確定要離開聊天室嗎？"
        /> 
        :
        <></>
      }
      {/*<Sidebar
        userInfo={{...userInfo}}
        room={room}
        userList={userList}
        onLoad={() => setLoading(false)}
        exitRoom={() =>  history.push('/mode')}
      />*/}
      
      <MessagesBox
        userInfo={{...userInfo}}
        message={message}
        setMessage={setMessage}
        messagesInfo={messagesInfo}
        sendMessage={sendMessage}
        uploadImage={uploadImage}
      />
      
      {loading ? (<Loading />) : null}
    </main>
  );
};

Chat.propTypes = {
  client: PropTypes.object.isRequired
};


export default Chat;
