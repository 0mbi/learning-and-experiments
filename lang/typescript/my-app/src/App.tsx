import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
// import './App.css';
import JSONTree from 'react-json-tree'

// https://stackoverflow.com/questions/37764665/typescript-sleep
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) )
}

function App() {
  const [apiFetched, setApiFetched] = useState(false)
  const [ajson, setAjson] = useState("")
  const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633',
  };
  // add an empty list for calling useEffect only on first render
  // https://stackoverflow.com/questions/55484033/reactjs-how-to-call-useeffect-hook-only-once-to-fetch-api-data
  // https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
  useEffect(() => {
    console.log('called use effect')
    const api =  'http://dummy.restapiexample.com/api/v1/employees'
    fetch(api)
      .then(response => response.json())
      .then(res => {
        setAjson(res)
        delay(3000).then(any=>setApiFetched(true)) // simulate longer loading
      })
      .catch((error: any) => console.log(error.message)) // logs any error from the promise
  }, [])
  return (
    <div>
      <JSONTree data={ajson} theme={theme} />
      <p>Fetching API: {apiFetched?"false":"true"}</p>
      <p>Finished fetching: {apiFetched?"true":"false"}</p>
    </div>
  );
}

export default App;
