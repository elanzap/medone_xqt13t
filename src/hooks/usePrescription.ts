import { useState, useEffect } from 'react';
import type { Prescription, VitalSigns, Medication } from '../types';
import { Diagnosis } from '../constants/diagnoses';
import { MEDICATIONS_BY_DIAGNOSIS } from '../constants/medications';
import { LAB_TESTS_BY_DIAGNOSIS } from '../constants/labTests';

export const usePrescription = (patientId: string, initialData?: Partial<Prescription>) => {
  const [prescription, setPrescription] = useState<Partial<Prescription>>({
    patientId,
    date: new Date().toISOString(),
    medications: [],
    labTests: [],
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setPrescription(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const updateVitalSigns = (vitalSigns: VitalSigns) => {
    setPrescription(prev => ({ ...prev, vitalSigns }));
  };

  const updateSymptoms = (symptoms: string) => {
    setPrescription(prev => ({ ...prev, symptoms }));
  };

  const updateDiagnosis = (diagnosis: Diagnosis) => {
    setPrescription(prev => ({
      ...prev,
      diagnosis,
      medications: MEDICATIONS_BY_DIAGNOSIS[diagnosis],
      labTests: LAB_TESTS_BY_DIAGNOSIS[diagnosis],
    }));
  };

  const updateMedications = (medications: Medication[]) => {
    setPrescription(prev => ({ ...prev, medications }));
  };

  return {
    prescription,
    updateVitalSigns,
    updateSymptoms,
    updateDiagnosis,
    updateMedications,
  };
};
