/* This is the component for the table */

function TabletGrid({letters}: { letters: string[][]}) {
  
    const handleCellClick = (r: number, c: number) => {
    console.log(r, c)
  }

  
  return (
        <div>
      {letters.map((row, r) => (
        <div key={r} style={{ display: 'flex' }}>

          {row.map((letter, c) => (
<div key={`${r}-${c}`} onClick={() => handleCellClick(r, c)} style={{ border: '1px solid white' }}>
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>

  )


}
export default TabletGrid
