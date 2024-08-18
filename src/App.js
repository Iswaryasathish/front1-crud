import React, { useState } from 'react';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import './App.css'; // Import CSS file

const App = () => {
  const [currentPatient, setCurrentPatient] = useState(null);

  const handleEdit = (patient) => {
    setCurrentPatient(patient);
  };

  const handleSave = () => {
    setCurrentPatient(null);
  };

  const handleClear = () => {
    setCurrentPatient(null);
  };

  return (
    <div className="App">
      <h1>Patient Management</h1>
      <PatientForm currentPatient={currentPatient} onSave={handleSave} onClear={handleClear} />
      <PatientList onEdit={handleEdit} />
    </div>
  );
};

export default App;

    
