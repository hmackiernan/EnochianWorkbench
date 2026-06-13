import { useState } from 'react'

const greeting: String = "o";


function App() {
    const [count, setCount] = useState(0)
    const [preamble,setPreamble] = useState("Hello")
    const repeatedGreeting: String = greeting.repeat(count);
  return (
    <div>
      <h1>  {preamble}{repeatedGreeting}  World</h1>

      <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
    <br></br>
    <button onClick={() => setCount(count > 0 ? count - 1 : 0)}>
      Lose an o {count}
    </button>
<br></br>
    <button onClick={() => setCount( 0)}>
      Back to the beginning
    </button>
    
   {/* You'll also want to add a value prop to make it a controlled component — meaning React's state is the source of truth for what's in the field:
//tsx<input value={preamble} onChange={(e) => setPreamble(e.target.value)}></input>
//Without value={preamble} the input manages its own state internally and React doesn't fully control it. With it, the input always displays whatever is in state, and every keystroke updates state, which updates the input. It's a loop but a deliberate one.
*/}
    <form>
<input value={preamble} onChange={(e) => setPreamble(e.target.value)}></input>    </form>
    </div>
  )
}

export default App