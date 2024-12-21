import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useDiagnosisStore } from '../../stores/diagnosisStore';

interface DiagnosisTemplateFormProps {
  templateId?: string | null;
  onClose: () => void;
}

export const DiagnosisTemplateForm: React.FC<DiagnosisTemplateFormProps> = ({
  templateId,
  onClose,
}) => {
  const { diagnosisTemplates, addDiagnosisTemplate, updateDiagnosisTemplate } = useDiagnosisStore();
  const [formData, setFormData] = useState({
    name: '',
    medications: [{ name: '', dosage: '', interval: '', duration: '', instructions: '' }],
    labTests: [''],
  });

  useEffect(() => {
    if (templateId) {
      const template = diagnosisTemplates.find(t => t.id === templateId);
      if (template) {
        setFormData({
          name: template.name,
          medications: template.medications,
          labTests: template.labTests,
        });
      }
    }
  }, [templateId, diagnosisTemplates]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      medications: formData.medications.filter(med => med.name.trim()),
      labTests: formData.labTests.filter(test => test.trim()),
    };

    if (templateId) {
      updateDiagnosisTemplate(templateId, cleanedData);
    } else {
      addDiagnosisTemplate(cleanedData);
    }
    onClose();
  };

  const addMedication = () => {
    setFormData(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '', interval: '', duration: '', instructions: '' }],
    }));
  };

  const removeMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }));
  };

  const updateMedication = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      ),
    }));
  };

  const addLabTest = () => {
    setFormData(prev => ({
      ...prev,
      labTests: [...prev.labTests, ''],
    }));
  };

  const removeLabTest = (index: number) => {
    setFormData(prev => ({
      ...prev,
      labTests: prev.labTests.filter((_, i) => i !== index),
    }));
  };

  const updateLabTest = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      labTests: prev.labTests.map((test, i) =>
        i === index ? value : test
      ),
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              {templateId ? 'Edit' : 'Add'} Diagnosis Template
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Diagnosis Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Diagnosis Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Medications */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-medium text-gray-700">Medications</h4>
              <button
                type="button"
                onClick={addMedication}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Medication
              </button>
            </div>
            <div className="space-y-4">
              {formData.medications.map((med, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={med.name}
                        onChange={(e) => updateMedication(index, 'name', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Dosage</label>
                      <input
                        type="text"
                        value={med.dosage}
                        onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Interval</label>
                      <input
                        type="text"
                        value={med.interval}
                        onChange={(e) => updateMedication(index, 'interval', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <input
                        type="text"
                        value={med.duration}
                        onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Instructions</label>
                      <input
                        type="text"
                        value={med.instructions}
                        onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeMedication(index)}
                      className="inline-flex items-center text-sm text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lab Tests */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-medium text-gray-700">Lab Tests</h4>
              <button
                type="button"
                onClick={addLabTest}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Lab Test
              </button>
            </div>
            <div className="space-y-2">
              {formData.labTests.map((test, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={test}
                    onChange={(e) => updateLabTest(index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Enter lab test"
                  />
                  <button
                    type="button"
                    onClick={() => removeLabTest(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {templateId ? 'Update' : 'Save'} Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
