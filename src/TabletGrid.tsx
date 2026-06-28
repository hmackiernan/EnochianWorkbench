/* This is the component for the table */

/*import { useState } from 'react' */


function TabletGrid({ letters, selected, onCellClick }: { letters: string[][], selected: Set<string>, onCellClick: (r: number, c: number) => void }) {
  
   /* const [selected, setSelected] = useState<Set<string>>(new Set())*/


  
  return (
        <div>
      {letters.map((row, r) => (
        <div key={r} className="tablet-row">

          {row.map((letter, c) => (
<div key={`${r}-${c}`} onClick={() => onCellClick(r, c)} className={selected.has(`${r}-${c}`) ? "tablet-cell tablet-cell-selected" : "tablet-cell"}>
 {letter}
            </div>
          ))}
        </div>
      ))}
    </div>

  )


}
export default TabletGrid
