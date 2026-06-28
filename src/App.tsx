/* import { useState } from 'react' */
import './App.css'
import TabletGrid from './TabletGrid'

function App() {
const mockLetters = Array.from({ length: 12 }, (_, r) =>
  Array.from({ length: 13 }, (_, c) => String.fromCharCode(65 + (r * 13 + c) % 26))
)

  return (
    <div>
      <h1> Enochian Workbench</h1>
      <TabletGrid letters={mockLetters} />
    </div>
  )
}

export default App