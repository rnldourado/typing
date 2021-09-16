import React from 'react';

const App = () => {
  return (
    <div className="container">
      <div className="valid-keys">
        <span className="matched">
          Ran
        </span>
        <span className="remainder">
          iel
        </span>
      </div>
      <div className="typed-keys">raenfiael</div>
      <div className="completed-words">
        <ol>
          <li>Carro</li>
          <li>Top</li>
          <li>Barra</li>
        </ol>
      </div>
    </div>
  )
}

export default App;