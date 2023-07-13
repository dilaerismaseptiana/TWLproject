import React, { useState } from 'react';
import axios from 'axios';
import './editpersonform.css';

const EditPersonForm = ({ id, nama, kode, alamat, nomerTelepon, handleUpdate }) => {
  const [formData, setFormData] = useState({
    nama: nama,
    kode: kode,
    alamat: alamat,
    nomerTelepon: nomerTelepon
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8080/persons/${id}', formData);
      handleUpdate(id, formData);
    } catch (error) {
      console.error('Error updating person data:', error);
    }
  };

  const handleCancel = () => {
    // Tambahkan logika untuk membatalkan perubahan dan menghapus form edit
  };

  return (
    <tr>
      <td>
        <input type="text" name="nama" value={formData.nama} onChange={handleChange} />
      </td>
      <td>
        <input type="text" name="kode" value={formData.kode} onChange={handleChange} />
      </td>
      <td>
        <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} />
      </td>
      <td>
        <input type="text" name="nomerTelepon" value={formData.nomerTelepon} onChange={handleChange} />
      </td>
      <td>
        <button type="submit" onClick={handleSubmit}>Update</button>
      </td>
      <td>
        <button onClick={handleCancel}>Cancel</button>
      </td>
    </tr>
  );
};

export default EditPersonForm;
