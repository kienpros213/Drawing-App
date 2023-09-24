import './App.css'
import Canvas from './components/Canvas'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Login from './components/Login'

function App() {

  return (
    <div className='App'>
      <Login />
      <Canvas
        width={700}
        height={500}
      />
    </div>
  )
}

export default App
