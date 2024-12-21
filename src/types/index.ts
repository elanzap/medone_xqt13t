// Keep only the necessary types, removing any unused ones
export interface Patient {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phoneNumber: string;
  visits: Visit[];
}

export interface Visit {
  id: string;
  visitId: string;
  patientId: string;
  date: string;
  prescriptionId?: string;
  vitalSigns?: VitalSigns;
}

export interface VitalSigns {
  bloodPressure: string;
  pulseRate: number;
  temperature: number;
  weight: number;
}

export interface Prescription {
  id: string;
  prescriptionId: string;
  visitId: string;
  patientId: string;
  date: string;
  vitalSigns: VitalSigns;
  symptoms: string;
  diagnosis: string;
  medications: Medication[];
  labTests: string[];
}

export interface Medication {
  name: string;
  dosage: string;
  interval: string;
  duration: string;
  instructions: string;
}
