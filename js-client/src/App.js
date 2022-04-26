/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//import io from 'socket.io-client';

import Home from './views/Home';
import Chat from './views/Chat';
import { BroadcastClient } from "./service_grpc_web_pb";

var client = new BroadcastClient("http://localhost:8080", null, null);
//import Mode from './views/Mode';
//import Navbar from './components/common/Navbar';

//const ENDPOINT = 'https://yachen-chatroom.herokuapp.com/';
//const socket = io(ENDPOINT);

const App = () => {
  return (
    /*
    <>
      <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/mode" render={() => <Mode socket={socket} />} />
        <Route path="/chat" render={() => <Chat socket={socket} />} />
      </BrowserRouter>
    </>
    */
    <>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/chat" render={() => <Chat client={client} />} />
      </BrowserRouter>
    </>
  );
};

export default App;
