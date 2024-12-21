import React from 'react';
import type { Medication } from '../../types';

interface MedicationListProps {
  medications: Medication[];
}

export const MedicationList: React.FC<MedicationListProps> = ({ medications }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Medications</h3>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Dosage</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Interval</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Instructions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {medications.map((medication, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm text-gray-900">{medication.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{medication.dosage}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{medication.interval}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{medication.duration}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{medication.instructions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
