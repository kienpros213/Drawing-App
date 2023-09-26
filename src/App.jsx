import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import Canvas from "./components/Canvas";
import Room from "./components/Room";

function App() {
  const [socket, setSocket] = useState(null);
  const [roomName, setRoomName] = useState(null);

  useEffect(() => {
    const initSocket = io("ws://localhost:3000");
    setSocket(initSocket);
  }, []);

  return (
    <div className="App">
      <Stack>
        <Room socket={socket} roomName={roomName} setRoomName={setRoomName} />
        <Canvas roomName={roomName} socket={socket} width={700} height={500} />
      </Stack>
    </div>
  );
}

export default App;
