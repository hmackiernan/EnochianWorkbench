
import { useState } from 'react' 

/* the signature here corresponds to the three 'props' passed in when the component */  
/* is instantiated over in App.tsx */   

function ControlPanel( {selected, onCommitSelectionAsName,onClearSelection}: {selected: Set<string>,onCommitSelectionAsName: (label: string) => void,onClearSelection: () => void }) {

/* selectionName is a piece of state local to this component */
/* and we get its setter function for free, setSelectionName */

const [selectionName, setSelectionName] = useState<string>("")


/* We have to go through the indirection of setting selectionName in the local state when */
/* someone modifies the text field; this is apparently 'the React way' for 'managed components' */
/* moreover in that case we have to use 'e' the event that is returned as an input */ 
/* and read the value of the field from the event ojbect*/
/* Then, the onClick handler for the button reads that state and passes it up to */
/* (the function for which onCommitSelectionAsname is a prop) */

return(<div>
 <input value={selectionName} onChange={(e) => setSelectionName(e.target.value)}></input>
<button onClick={() => onCommitSelectionAsName(selectionName)}>Save Selection w/ Name</button>
<button onClick={onClearSelection}>Clear Selection</button>
</div>)


}

export default ControlPanel