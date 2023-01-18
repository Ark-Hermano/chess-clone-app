import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useDrag } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Play } from './pages/home/play'

function App() {

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Play />
      </DndProvider>
    </div>
  )
}

export default App
