import { useState } from 'react' 
import './App.css'
import TabletGrid from './TabletGrid'

function App() {

const [selected, setSelected] = useState<Set<string>>(new Set())

  const handleCellClick = (r: number, c: number) => {
   const key = `${r}-${c}`
   setSelected(prev => {
  const next = new Set(prev)
    if (next.has(key)) {
      next.delete(key)
    } else {
      next.add(key)
    }
    console.log(key)
    return next
  })
  }

const mockLetters = Array.from({ length: 12 }, (_, r) =>
  Array.from({ length: 13 }, (_, c) => String.fromCharCode(65 + (r * 13 + c) % 26))
)

  return (
    <div>
      <h1> Enochian Workbench</h1>
      <TabletGrid letters={mockLetters} selected={selected} onCellClick={handleCellClick} />
    </div>
  )
}

export default App