import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddPersonForm = () => {
  const navigate = useNavigate();

  const [newPerson, setNewPerson] = useState({
    nama: '',
    kode: '',
    alamat: '',
    nomerTelepon: ''
  });

  const handleInputChange = (e) => {
    setNewPerson({
      ...newPerson,
      [e.target.name]: e.target.value
    });
  };

  const handleAddPerson = async () => {
    try {
      await axios.post('https://tw-lproject.vercel.app/persons', newPerson);
      console.log('Person added:', newPerson);
      setNewPerson({
        nama: '',
        kode: '',
        alamat: '',
        nomerTelepon: ''
      });
      // Alihkan ke halaman /dashboard setelah berhasil menambahkan person
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  return (
    <div>
      <h1>Add Data</h1>
      <form>
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={newPerson.nama}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="kode"
          placeholder="Kode"
          value={newPerson.kode}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="alamat"
          placeholder="Alamat"
          value={newPerson.alamat}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nomerTelepon"
          placeholder="Nomor Telepon"
          value={newPerson.nomerTelepon}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleAddPerson}>
          Add Data
        </button>
      </form>
    </div>
  );
};

export default AddPersonForm;
