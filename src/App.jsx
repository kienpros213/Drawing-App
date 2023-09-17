import './App.css'
import Canvas from './components/Canvas'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function App() {

  return (
    <div className='App'>
      <Canvas
        width = {700}
        height = {500}
      />
    </div>
  )
}

export default App
