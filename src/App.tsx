import { useState } from 'react'

const greeting: String = "o";


function App() {
    const [count, setCount] = useState(0)
    const repeatedGreeting: String = greeting.repeat(count);
  return (
    <div>
      <h1>  Hello{repeatedGreeting}  World</h1>

      <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>

    
    </div>
  )
}

export default App