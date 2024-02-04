import React, { useState } from 'react';

function App() {
  const [number, setNumber] = useState(null);

  const fetchNumber = async () => {
    const response = await fetch('/api/random-number/');
    const data = await response.json();
    setNumber(data.number);
  };

  return (
    <div>
      <button onClick={fetchNumber}>Generate random number</button>
      {number && <p>{number}</p>}
    </div>
  );
}

export default App;