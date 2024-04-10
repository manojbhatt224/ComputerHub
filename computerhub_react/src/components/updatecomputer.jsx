
import './addcomputer.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function UpdateComputer({computer} ) {

    const [specifications, setSpecifications] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect((computer) => {
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
                const response = await axios.put('http://127.0.0.1:7000/computers/'+computer.computer_id, {
                    computer_code: formData.get('computer_code'),
                    computer: formData.get('computer_specification'),
                    quantity: formData.get('quantity'),
                    unit_rate: formData.get('unit_rate')
                });

                setSuccessMessage(response.data.msg);
                setErrorMessage('');
                form.reset();
                } catch (error) {
                setSuccessMessage('');
                setErrorMessage(error.response.data.errors.computer_code[0]);
            }
        }
    };

  return (
<>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}


        <form id="computerForm" onSubmit={handleSubmit}>
            <div className="input-group">
            <label htmlFor="computer_code">Computer Code:</label>
            <input type="text" id="computer_code" name="computer_code" value="{computer.computer_code}" required/>
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
            <input type="number" id="quantity" name="quantity" value="{computer.quantity}" required/><br/>
            </div>

            <div className="input-group">
            <label htmlFor="unit_rate">Unit Rate:</label>
            <input type="number" step="0.01" id="unit_rate" name="unit_rate" value="{computer.unit_rate}" required/><br/>
 
            </div>
                 
            <button type="submit">Update</button>
        </form>
</>
  );
}

export default UpdateComputer;
