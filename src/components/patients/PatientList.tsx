import React, { useState, useMemo } from 'react';
import type { Patient, Prescription } from '../../types';
import { User, FileText, Search, History } from 'lucide-react';
import { PatientDetails } from './PatientDetails';

interface PatientListProps {
  patients: Patient[];
  prescriptions: Prescription[];
  onSelectPatient: (patient: Patient) => void;
}

export const PatientList: React.FC<PatientListProps> = ({ 
  patients, 
  prescriptions,
  onSelectPatient 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientForDetails, setSelectedPatientForDetails] = useState<Patient | null>(null);

  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        patient.name.toLowerCase().includes(searchTerm) ||
        patient.phoneNumber.includes(searchTerm) ||
        patient.patientId?.toLowerCase().includes(searchTerm) ||
        patient.age.toString().includes(searchTerm)
      );
    });
  }, [patients, searchQuery]);

  if (selectedPatientForDetails) {
    return (
      <PatientDetails
        patient={selectedPatientForDetails}
        prescriptions={prescriptions.filter(p => p.patientId === selectedPatientForDetails.patientId)}
        onBack={() => setSelectedPatientForDetails(null)}
        onNewPrescription={onSelectPatient}
      />
    );
  }

  if (patients.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No patients</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by adding a new patient from the New Patient tab.
        </p>
      </div>
    );
  }

  const getPatientPrescriptionCount = (patientId: string) => {
    return prescriptions.filter(p => p.patientId === patientId).length;
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search by name, ID, phone, or age..."
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredPatients.map((patient) => (
            <li
              key={patient.id}
              className="px-6 py-4 hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0">
                  <div className="flex-shrink-0">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-indigo-600">
                        {patient.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({patient.patientId})
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {patient.age} years • {patient.gender} • {patient.phoneNumber}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Total Prescriptions: {getPatientPrescriptionCount(patient.patientId)}
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedPatientForDetails(patient)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <History className="h-4 w-4 mr-2" />
                    History
                  </button>
                  <button
                    onClick={() => onSelectPatient(patient)}
                    className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    New Prescription
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
