import "./App.css";
import Game from "./components/Game";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Start from "./components/Start";

function App() {
  const [messages, setMessages] = useState([]);
  const [counts, setCounts] = useState({});
  const [channel, setChannel] = useState("");
  const [sorted, setSorted] = useState([]);

  const tmi = require("tmi.js");
  let client = new tmi.Client({
    connection: {
      secure: true,
    },
    channels: [""],
  });

  useEffect(() => {
    messages.forEach(function (x) {
      const k = x.trim();
      if (k in counts) {
        setCounts({ ...counts, [k]: counts[k] + 1 });
      } else {
        setCounts({ ...counts, [k]: 1 });
      }
    });
  }, [messages]);

  const messageHandler = async (channel, tags, message) => {
    const m = message.trim().replace(/[^\x20-\x7E]/g, "");
    setMessages((messages) => [...messages, m]);
  };

  client.on("message", messageHandler);

  const handleConnect = () => {
    client.channels = [channel];
    client.connect();
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/start" />
          </Route>
          <Route exact path="/start">
            <Start setChannel={setChannel} handleConnect={handleConnect} />
          </Route>
          <Route exact path="/game">
            <Game
              counts={counts}
              setMessages={setMessages}
              setCounts={setCounts}
              sorted={sorted}
              messages={messages}
              setSorted={setSorted}
            />
          </Route>
        </Switch>
      </Router>
      <div className="Footer">Made with 🧂 by anydrr</div>
    </div>
  );
}

export default App;
