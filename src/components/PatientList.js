import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientList = ({ onEdit }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/patients')
      .then(response => setPatients(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/patients/${id}`)
      .then(() => setPatients(patients.filter(patient => patient._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Patient List</h2>
      <ul>
        {patients.map(patient => (
          <li key={patient._id}>
            <strong>{patient.name}</strong><br />
            Age: {patient.age}<br />
            Address: {patient.address}<br />
            <button onClick={() => onEdit(patient)}>Edit</button>
            <button onClick={() => handleDelete(patient._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
