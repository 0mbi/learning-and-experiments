import React, { useEffect, useState, FunctionComponent } from 'react';
import logo from './logo.svg';
// import './App.css';
import JSONTree from 'react-json-tree'

// https://stackoverflow.com/questions/37764665/typescript-sleep
function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) )
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface ProductProps {
  products: Product[];
}

const ProductTable: FunctionComponent<ProductProps> = ({products}) => <aside>
    <table>
      <caption>Our products</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>In Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product:Product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
</aside>


function App() {
  const [apiFetched, setApiFetched] = useState(false)
  const [ajson, setAjson] = useState("")
  const products : Product[] = [{id: 1, name: 'milk', price: 2, stock: 7}];

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
      <JSONTree data={ajson} />
      <p>Fetching API: {apiFetched?"false":"true"}</p>
      <p>Finished fetching: {apiFetched?"true":"false"}</p>
      <ProductTable products={products}></ProductTable>
    </div>
  );
}

export default App;
