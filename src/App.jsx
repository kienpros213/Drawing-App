import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import Canvas from "./components/Canvas";
import Room from "./components/Room";
import Login from "./components/Login";

function App() {
  const [socket, setSocket] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initSocket = io("ws://localhost:3000");
    setSocket(initSocket);
  }, []);

  if (isLoggedIn) {
    return (
      <div className="App">
        <Stack>
          <button
            type="button"
            onClick={() => {
              setIsLoggedIn(false);
            }}
          >
            {" "}
            log out{" "}
          </button>
          <Room socket={socket} roomName={roomName} setRoomName={setRoomName} />
          <Canvas
            roomName={roomName}
            socket={socket}
            width={700}
            height={500}
          />
        </Stack>
      </div>
    );
  }
  return <Login setIsLoggedIn={setIsLoggedIn} />;
}

export default App;
