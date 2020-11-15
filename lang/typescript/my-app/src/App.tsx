
import React, {useCallback, useState} from 'react';
import './App.css';

interface PCProp {
  idx: number;
  clickHandler: (idx: number) => void;
}

const PCButton: React.FC<PCProp> = ({idx, clickHandler}: PCProp) =>
<button onClick={() => clickHandler(idx)}>
  PC {idx}
</button>

const App: React.FC = () => {
  const [result, setResult] = useState(0)

  const hndl = (idx: number) => {
    console.log("Pressed " + idx)
    setResult(idx)
  }

  const arr = [1,2,3,4,5,6,7,8,9]

  return (
    <div className="App">
      {arr.map((_, i) =>
        <PCButton idx={i} clickHandler={hndl} /> )}
      <p>Result: {result}</p>
    </div>
  );
};

export default App;
