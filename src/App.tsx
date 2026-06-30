import { useState } from 'react' 
import './App.css'
import TabletGrid from './TabletGrid'
import ControlPanel from './ControlPanel'

function App() {

const [selected, setSelected] = useState<Set<string>>(new Set())

  const commitSelectionAsName = (label: string) => {console.log(label);  console.log(selected)}
  const clearSelection = () => setSelected(new Set())

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


/* these three parametrs in the ControlPanel tag are 'props' */
/* selected is the set of cells selected, onCommitSelectionAsName stands in for the actual function, and ditto for onClearSelection */
/* that's how the functions are known and used w/in ControlPanel */
  return (
   <div>
     <div>
      <h1> Enochian Workbench</h1>
      <TabletGrid letters={mockLetters} selected={selected} onCellClick={handleCellClick} />
    </div>
    <div>
      
      <ControlPanel selected={selected} onCommitSelectionAsName={commitSelectionAsName} onClearSelection={clearSelection}/>
    </div>
    </div>
  )
}

export default App