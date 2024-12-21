import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DiagnosisMedication {
  name: string;
  dosage: string;
  interval: string;
  duration: string;
  instructions: string;
}

interface DiagnosisTemplate {
  id: string;
  name: string;
  medications: DiagnosisMedication[];
  labTests: string[];
}

interface DiagnosisStore {
  diagnosisTemplates: DiagnosisTemplate[];
  addDiagnosisTemplate: (template: Omit<DiagnosisTemplate, 'id'>) => void;
  updateDiagnosisTemplate: (id: string, template: Partial<DiagnosisTemplate>) => void;
  deleteDiagnosisTemplate: (id: string) => void;
}

export const useDiagnosisStore = create<DiagnosisStore>()(
  persist(
    (set) => ({
      diagnosisTemplates: [],
      addDiagnosisTemplate: (template) => set((state) => ({
        diagnosisTemplates: [...state.diagnosisTemplates, {
          ...template,
          id: Math.random().toString(36).substr(2, 9)
        }]
      })),
      updateDiagnosisTemplate: (id, template) => set((state) => ({
        diagnosisTemplates: state.diagnosisTemplates.map((t) =>
          t.id === id ? { ...t, ...template } : t
        )
      })),
      deleteDiagnosisTemplate: (id) => set((state) => ({
        diagnosisTemplates: state.diagnosisTemplates.filter((t) => t.id !== id)
      })),
    }),
    {
      name: 'diagnosis-store'
    }
  )
);
