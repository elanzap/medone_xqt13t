import React from 'react';
import type { Patient } from '../../types';
import PatientForm from '../PatientForm';
import { generatePatientId } from '../../utils/idGenerator';

interface NewPatientFormProps {
  onSubmit: (patient: Omit<Patient, 'id'>) => void;
}

export const NewPatientForm: React.FC<NewPatientFormProps> = ({ onSubmit }) => {
  const handleSubmit = (patientData: Omit<Patient, 'id' | 'patientId' | 'visits'>) => {
    const newPatient = {
      ...patientData,
      patientId: generatePatientId(),
      visits: []
    };
    onSubmit(newPatient);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Add New Patient</h3>
        <PatientForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
