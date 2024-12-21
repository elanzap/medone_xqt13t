import React from 'react';
import { DIAGNOSES, Diagnosis } from '../../constants/diagnoses';

interface DiagnosisFormProps {
  value: string;
  onChange: (diagnosis: Diagnosis) => void;
}

export const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Diagnosis)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">Select diagnosis...</option>
        {DIAGNOSES.map((diagnosis) => (
          <option key={diagnosis} value={diagnosis}>
            {diagnosis}
          </option>
        ))}
      </select>
    </div>
  );
};
