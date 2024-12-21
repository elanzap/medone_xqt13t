import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useDiagnosisStore } from '../../stores/diagnosisStore';
import { DiagnosisTemplateForm } from './DiagnosisTemplateForm';

export const DiagnosisManager: React.FC = () => {
  const { diagnosisTemplates, deleteDiagnosisTemplate } = useDiagnosisStore();
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Diagnosis Templates</h3>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Diagnosis Template
        </button>
      </div>

      {/* Form Modal */}
      {(showForm || editingTemplate) && (
        <DiagnosisTemplateForm
          templateId={editingTemplate}
          onClose={() => {
            setShowForm(false);
            setEditingTemplate(null);
          }}
        />
      )}

      {/* Templates List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {diagnosisTemplates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">No diagnosis templates added yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create your first template
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {diagnosisTemplates.map((template) => (
              <li key={template.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900">{template.name}</h4>
                    <div className="mt-2 space-y-2">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700">Medications:</h5>
                        <ul className="mt-1 space-y-1">
                          {template.medications.map((med, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              {med.name} - {med.dosage} ({med.interval} for {med.duration})
                            </li>
                          ))}
                        </ul>
                      </div>
                      {template.labTests.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700">Lab Tests:</h5>
                          <ul className="mt-1 list-disc list-inside">
                            {template.labTests.map((test, index) => (
                              <li key={index} className="text-sm text-gray-600">{test}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ml-4 flex items-center space-x-3">
                    <button
                      onClick={() => setEditingTemplate(template.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteDiagnosisTemplate(template.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
