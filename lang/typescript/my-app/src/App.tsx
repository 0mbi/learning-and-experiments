import React from 'react';
import logo from './logo.svg';
import './App.css';
import JSONTree from 'react-json-tree'



function App() {
  const a_json = {
    array: [1, 2, 3],
    bool: true,
    object: {
      foo: 'bar'
    }
  }
  return (
    <div className="App">
      <JSONTree data={a_json} />
    </div>
  );
}

export default App;
