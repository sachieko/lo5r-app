import { useState } from 'react';
import './App.css';

const App = function() {
  const [label, setLabel] = useState('')

  return (
    <>
      <h1>App Header</h1>
      <div>
        {label}
      </div>
      <div className="card">
        <form>
          <input type="text" onInput={(e) => setLabel(e.target.value)}></input>
        </form>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
