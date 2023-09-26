import './App.css'
import Canvas from './components/Canvas'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Login from './components/Login'
import Room from './components/Room'

function App() {

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const initSocket = io('ws://localhost:3000');
    setSocket(initSocket);
  }, []);


  return (
    <div className='App'>
      <Room socket={socket} />
      <Canvas
        socket={socket}
        width={700}
        height={500}
      />
    </div>
  )
}

export default App
