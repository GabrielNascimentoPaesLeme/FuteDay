import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Nav/>
      <main className='container-app'>
        <Outlet/>
      </main>
    </div>
  );
}

export default App;
