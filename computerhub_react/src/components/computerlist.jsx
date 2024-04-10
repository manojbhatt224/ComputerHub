
import './computerlist.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { computersAtom } from '../App'


function ComputerList({ computers }) {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [specifications, setSpecifications] = useState([]);
    const [computerToUpdate, setComputerToUpdate] = useState(null); // State to store computer for update
    const [computerss, setComputerss] = useAtom(computersAtom); // Access the global atom

    useEffect(() => {
        axios.get('http://127.0.0.1:7000/computers/specifications/')
            .then(response => {
                setSpecifications(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching specifications:', error);
            });
    }, []);

    const handleUpdateClick = async (computer) => {
        try {
            setComputerToUpdate(computer);
        } catch (error) {
            console.error('Error fetching computers:', error);
        }
    };
    const handleDeleteClick = async (computer_id) => {
        try {
            const shouldDelete = window.confirm('Are you sure you want to delete this computer?');
            if (shouldDelete) {
                const response = await axios.delete('http://127.0.0.1:7000/computers/' + computer_id);
                setSuccessMessage(response.data.msg);
                setErrorMessage('');
                window.alert(successMessage)
                try {
                    const response = await axios.get('http://127.0.0.1:7000/computers/');
                    setComputerss(response.data.data);
                } catch (error) {
                    console.error('Error fetching computers:', error);
                }
            }
        } catch (error) {
            setSuccessMessage('');
            window.alert(errorMessage);
            setErrorMessage(error.response.data.errors.computer_code[0]);
        }
    };
    const handleUpdateSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const shouldSubmit = window.confirm('Are you sure you want to update this computer?');

        if (shouldSubmit) {
            try {
                const url = `http://127.0.0.1:7000/computers/${computerToUpdate.id}/`
                const comp = {
                    computer_code: formData.get('computer_code'),
                    computer: formData.get('computer_specification'),
                    quantity: formData.get('quantity'),
                    unit_rate: formData.get('unit_rate')
                }
                const response = await axios.put(url, comp)
                    .then(response => {
                        setSuccessMessage(response.data.msg);
                        setErrorMessage('');
                        window.alert(successMessage);
                        form.reset();
                        setComputerToUpdate(null)
                    })
                    .catch(error => {
                        console.error('Error making PUT request:', error);

                    });
                try {
                    const response = await axios.get('http://127.0.0.1:7000/computers/');
                    setComputerss(response.data.data);
                } catch (error) {
                    console.error('Error fetching computers:', error);
                }
            } catch (error) {
                setSuccessMessage('');
                setErrorMessage(error.response.data.errors.computer_code[0]);
                window.alert(errorMessage)
            }
        }
        else
            setComputerToUpdate(null)
    };
    const handleUpdateCancel = () => {
        setComputerToUpdate(null); // Clear update state on cancel
    };
    return (
        <div className="computer-list">
            <ul>
                {computers.map(computer => (
                    <li key={computer.id} className="computer-item">
                        <div className="computer-details">
                            <p><strong>Computer Code:</strong> {computer.computer_code}</p>
                            <p><strong>Quantity:</strong> {computer.quantity}</p>
                            <p><strong>Unit Rate:</strong> {computer.unit_rate}</p>
                            <p><strong>Total Price:</strong> {computer.total_price}</p>
                            <p><strong>Generation:</strong> {computer.computer.generation}</p>
                            <p><strong>RAM:</strong> {computer.computer.ram}</p>
                            <div className="button-wrapper">
                                <button onClick={(event) => { handleUpdateClick(computer) }} >Update</button>
                                <button onClick={(event) => { handleDeleteClick(computer.id) }}>Delete</button>
                            </div>
                        </div>
                        <div className="brand-logo-container">
                            <img className="brand-logo" src={`data:image/png;base64,${computer.computer.brand.logo_data}`} alt={computer.computer.brand.brand_name} />
                        </div>
                    </li>
                ))}
            </ul>
            {computerToUpdate && (
                <div className="update-popup">
                    <div className="update-popup-content">
                        <h2>Update Computer</h2>
                        {/* Form for updating computer details */}
                        <form onSubmit={handleUpdateSubmit}>
                            <div className="input-group">
                                <label htmlFor="computer_code">Computer Code:</label>
                                <input type="text" id="computer_code" name="computer_code" value={computerToUpdate.computer_code} required
                                    onChange={(e) =>
                                        setComputerToUpdate({
                                            ...computerToUpdate,
                                            computer_code: e.target.value,
                                        })
                                    } />
                            </div>

                            <div className="input-group">
                                <label htmlFor="computer_specification">Computer Specification:</label>
                                <select id="computer_specification" name="computer_specification" required value={computerToUpdate.computer.id}>
                                    {specifications.map(specification => (
                                        <option key={specification.id} value={specification.id}>
                                            {specification.generation}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group">
                                <label htmlFor="quantity">Quantity:</label>
                                <input type="number" id="quantity" name="quantity" value={computerToUpdate.quantity} required
                                    onChange={(e) =>
                                        setComputerToUpdate({
                                            ...computerToUpdate,
                                            quantity: e.target.value,
                                        })
                                    } />
                            </div>

                            <div className="input-group">
                                <label htmlFor="unit_rate">Unit Rate:</label>
                                <input type="number" step="0.01" id="unit_rate" name="unit_rate" value={computerToUpdate.unit_rate} required

                                    onChange={(e) =>
                                        setComputerToUpdate({
                                            ...computerToUpdate,
                                            unit_rate: e.target.value,
                                        })
                                    } />

                            </div>

                            <button type="submit">
                                Update
                            </button>
                            <button type="button" onClick={handleUpdateCancel}>
                                Cancel
                            </button>
                        </form>
                        {/* Display success or error messages */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ComputerList;
