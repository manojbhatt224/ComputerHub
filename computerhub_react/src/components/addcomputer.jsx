
import './addcomputer.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { computersAtom } from '../App'

function AddComputer({} ) {

    const [specifications, setSpecifications] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [computers, setComputers] = useAtom(computersAtom); // Access the global atom

    useEffect(() => {
      axios.get('http://127.0.0.1:7000/computers/specifications/')
        .then(response => {
          setSpecifications(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching specifications:', error);
        });
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const shouldSubmit = window.confirm('Are you sure you want to submit this form?');

        if (shouldSubmit) {
            try {
                const response = await axios.post('http://127.0.0.1:7000/computers/', {
                    computer_code: formData.get('computer_code'),
                    computer: formData.get('computer_specification'),
                    quantity: formData.get('quantity'),
                    unit_rate: formData.get('unit_rate')
                });

                setSuccessMessage(response.data.msg);
                setErrorMessage('');
                window.alert(successMessage)
                form.reset();
                try {
                    const response = await axios.get('http://127.0.0.1:7000/computers/');
                    setComputers(response.data.data);
                  } catch (error) {
                    console.error('Error fetching computers:', error);
                  }
                } catch (error) {
                setSuccessMessage('');
                setErrorMessage(error.response.data.errors.computer_code[0]);
                window.alert(errorMessage)
            }
        }
    };

  return (
<>
          

        <form id="computerForm" onSubmit={handleSubmit}>
            <div className="input-group">
            <label htmlFor="computer_code">Computer Code:</label>
            <input type="text" id="computer_code" name="computer_code" required/>
            </div>
            
            <div className="input-group">
            <label htmlFor="computer_specification">Computer Specification:</label>
            <select id="computer_specification" name="computer_specification" required>
            {specifications.map(specification => (
              <option key={specification.id} value={specification.id}>
                {specification.generation}
              </option>
            ))}
            </select>
            </div>

            <div className="input-group">
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" required/><br/>
            </div>

            <div className="input-group">
            <label htmlFor="unit_rate">Unit Rate:</label>
            <input type="number" step="0.01" id="unit_rate" name="unit_rate" required/><br/>
 
            </div>
                 
            <button type="submit">Add</button>
        </form>
</>
  );
}

export default AddComputer;
