import React from 'react';
import { VitalSignsForm } from './VitalSignsForm';
import { DiagnosisForm } from './DiagnosisForm';
import { MedicationList } from './MedicationList';
import { LabTestList } from './LabTestList';
import { PrescriptionActions } from './PrescriptionActions';
import { usePrescription } from '../../hooks/usePrescription';
import { generateVisitId, generatePrescriptionId } from '../../utils/idGenerator';
import type { Diagnosis } from '../../constants/diagnoses';

interface PrescriptionFormProps {
  patientId: string;
  onSubmit: (prescriptionData: any) => void;
  initialData?: any;
}

export const PrescriptionForm: React.FC<PrescriptionFormProps> = ({ 
  patientId, 
  onSubmit,
  initialData 
}) => {
  const visitId = generateVisitId(patientId);
  const prescriptionId = generatePrescriptionId(visitId);
  
  const { prescription, updateVitalSigns, updateSymptoms, updateDiagnosis } = usePrescription(
    patientId,
    {
      ...initialData,
      visitId,
      prescriptionId,
    }
  );

  const handleSubmit = (data: any) => {
    onSubmit({
      ...data,
      visitId,
      prescriptionId,
    });
  };

  return (
    <form className="space-y-8">
      <div className="bg-gray-50 px-4 py-2 rounded-md">
        <p className="text-sm text-gray-600">Visit ID: {visitId}</p>
        <p className="text-sm text-gray-600">Prescription ID: {prescriptionId}</p>
      </div>

      <VitalSignsForm
        value={prescription.vitalSigns || {}}
        onChange={updateVitalSigns}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">Symptoms</label>
        <textarea
          value={prescription.symptoms || ''}
          onChange={(e) => updateSymptoms(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <DiagnosisForm
        value={prescription.diagnosis || ''}
        onChange={(diagnosis: Diagnosis) => updateDiagnosis(diagnosis)}
      />

      {prescription.medications && prescription.medications.length > 0 && (
        <MedicationList medications={prescription.medications} />
      )}

      {prescription.labTests && prescription.labTests.length > 0 && (
        <LabTestList labTests={prescription.labTests} />
      )}

      <PrescriptionActions
        prescription={prescription}
        onSave={handleSubmit}
      />
    </form>
  );
};
