import type { Patient, Prescription } from '../types';

const STORAGE_KEYS = {
  PATIENTS: 'medscript_patients',
  PRESCRIPTIONS: 'medscript_prescriptions'
} as const;

export const loadPatients = (): Patient[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PATIENTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading patients:', error);
    return [];
  }
};

export const savePatients = (patients: Patient[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
  } catch (error) {
    console.error('Error saving patients:', error);
  }
};

export const loadPrescriptions = (): Prescription[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRESCRIPTIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading prescriptions:', error);
    return [];
  }
};

export const savePrescriptions = (prescriptions: Prescription[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(prescriptions));
  } catch (error) {
    console.error('Error saving prescriptions:', error);
  }
};
