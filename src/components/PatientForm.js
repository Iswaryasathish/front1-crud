import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientForm = ({ currentPatient, onSave, onClear }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (currentPatient) {
      setName(currentPatient.name);
      setAge(currentPatient.age);
      setAddress(currentPatient.address);
    } else {
      setName('');
      setAge('');
      setAddress('');
    }
  }, [currentPatient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const patientData = { name, age, address };

    if (currentPatient) {
      axios.put(`http://localhost:5000/api/patients/${currentPatient._id}`, patientData)
        .then(() => {
          onSave();
          onClear();
        })
        .catch(err => console.error(err));
    } else {
      axios.post('http://localhost:5000/api/patients', patientData)
        .then(() => {
          onSave();
          onClear();
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{currentPatient ? 'Update Patient' : 'Add New Patient'}</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      <button type="submit">{currentPatient ? 'Update Patient' : 'Add Patient'}</button>
      {currentPatient && <button type="button" onClick={onClear}>Clear</button>}
    </form>
  );
};

export default PatientForm;
