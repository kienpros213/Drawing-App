import './App.css'
import Canvas from './components/Canvas'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Room from './components/Room'
import { Stack } from '@chakra-ui/react'

function App() {

  const [socket, setSocket] = useState(null);
  const [roomName, setRoomName] = useState(null);

  useEffect(() => {
    const initSocket = io('ws://localhost:3000');
    setSocket(initSocket);
  }, []);


  return (
    <div className='App'>
      <Stack>
        <Room socket={socket} roomName={roomName} setRoomName={setRoomName} />
        <Canvas
          roomName={roomName}
          socket={socket}
          width={700}
          height={500}
        />
      </Stack>
    </div>
  )
}

export default App
