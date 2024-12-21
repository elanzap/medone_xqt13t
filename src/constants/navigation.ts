import { 
  UserPlus, 
  Users, 
  FileText, 
  Stethoscope, 
  Settings
} from 'lucide-react';

export const NAVIGATION_ITEMS = [
  { 
    id: 'patients',
    icon: Users,
    text: 'Patients',
    href: '#patients' 
  },
  { 
    id: 'new-patient',
    icon: UserPlus,
    text: 'New Patient',
    href: '#new-patient' 
  },
  { 
    id: 'prescriptions',
    icon: FileText,
    text: 'Prescriptions',
    href: '#prescriptions' 
  },
  {
    id: 'diagnoses',
    icon: Stethoscope,
    text: 'Diagnoses',
    href: '#diagnoses'
  },
  { 
    id: 'settings',
    icon: Settings,
    text: 'Settings',
    href: '#settings' 
  },
] as const;
