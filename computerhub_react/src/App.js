
import { useState, useEffect } from 'react';
import './App.css';
import AddComputer from './components/addcomputer';
import ComputerList from './components/computerlist';
import axios from 'axios';

import { atom, useAtom } from 'jotai'
// Create a Jotai atom for computers
export const computersAtom = atom([]);

function App() {
  const [showAddComputer, setShowAddComputer] = useState(false) ;
  // const [computers, setComputers] = useState([]);

  const [computers, setComputers] = useAtom(computersAtom);
  useEffect(() => {
    fetchComputers();
  }, []);

  const fetchComputers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:7000/computers/');
      setComputers(response.data.data);
    } catch (error) {
      console.error('Error fetching computers:', error);
    }
  };

 
  return (
<>
<nav className="navbar navbar-expand-lg bg-success">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">COMPUTER HUB </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
              <button className="nav-link active" aria-current="page" onClick={() => setShowAddComputer(true)}>Add Computer</button>
              </li>
              <li className="nav-item">
              <button className="nav-link" onClick={() => setShowAddComputer(false)}>View Computers</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

<div className="container">

        {showAddComputer ? <AddComputer/> :<ComputerList computers={computers}/>}

      
</div>


</>

  );
}

export default App;
