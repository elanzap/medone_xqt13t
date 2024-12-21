export const generatePatientId = (): string => {
  const prefix = 'P';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

export const generateVisitId = (patientId: string): string => {
  const prefix = 'V';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return `${prefix}${patientId.slice(1, 5)}${timestamp}${random}`;
};

export const generatePrescriptionId = (visitId: string): string => {
  const prefix = 'RX';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return `${prefix}${visitId.slice(1, 5)}${timestamp}${random}`;
};
