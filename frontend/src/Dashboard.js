// dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';
import AddPersonForm from './AddPersonForm';
import EditPersonForm from './editPersonForm';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const headers = {
        Authorization: `Bearer ${token}` // Add the token to the 'Authorization' header
      };
      console.log(token)
  
      const response = await axios.get('http://localhost:8080/persons', { headers });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/persons/${id}`);
      console.log(`Delete entry with ID: ${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const handleAddPerson = async (newPersonData) => {
    try {
      await axios.post('http://localhost:8080/persons', newPersonData);
      console.log('Person added:', newPersonData);
      fetchData();
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleUpdate = async (id, updatedPersonData) => {
   try {
      await axios.put(`http://localhost:8080/persons/${id}`, updatedPersonData);
      console.log(`Person with ID ${id} updated:`, updatedPersonData);
      setEditId(null);
      fetchData();
    } catch (error) {
      console.error('Error updating person:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div>
      <h1>Data Kampus</h1>
      {/* <AddPersonForm handleAddPerson={handleAddPerson} /> */}
      <table className="data-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kode</th>
            <th>Alamat</th>
            <th>Nomor Telepon</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <React.Fragment key={entry._id}>
              {editId === entry._id ? (
                <EditPersonForm
                  id={entry._id}
                  nama={entry.nama}
                  kode={entry.kode}
                  alamat={entry.alamat}
                  nomerTelepon={entry.nomerTelepon}
                  handleUpdate={handleUpdate}
                />
              ) : (
                <tr>
                  <td>{entry.nama}</td>
                  <td>{entry.kode}</td>
                  <td>{entry.alamat}</td>
                  <td>{entry.nomerTelepon}</td>
                  <td>
                    <button onClick={() => handleEdit(entry._id)} className="edit-button">
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(entry._id)} className="delete-button">
                      Delete
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;