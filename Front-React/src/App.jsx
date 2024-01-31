import { useState } from "react";
import io from "socket.io-client";
import LoginComponent from "./components/LoginComponent";
import ChatComponent from "./components/ChatComponent";

const socket = io("http://localhost:5170");

function App() {
  const [alias, setAlias] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (userAlias) => {
    socket.emit("connectUser", { alias: userAlias });
    setAlias(userAlias);
    setLoggedIn(true);
  };

  return (
    <div className="app">
      {!loggedIn ? (
        <LoginComponent onLogin={handleLogin} />
      ) : (
        <ChatComponent alias={alias} socket={socket} />
      )}
    </div>
  );
}

export default App;
