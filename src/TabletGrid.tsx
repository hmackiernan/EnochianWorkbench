/* This is the component for the table */

import { useState } from 'react' 


function TabletGrid({letters}: { letters: string[][]}) {
  
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

  
  return (
        <div>
      {letters.map((row, r) => (
        <div key={r} className="tablet-row">

          {row.map((letter, c) => (
<div key={`${r}-${c}`} onClick={() => handleCellClick(r, c)} className={selected.has(`${r}-${c}`) ? "tablet-cell tablet-cell-selected" : "tablet-cell"}>
 {letter}
            </div>
          ))}
        </div>
      ))}
    </div>

  )


}
export default TabletGrid
