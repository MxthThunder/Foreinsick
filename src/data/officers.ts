export interface Officer {
  id: string;
  initials: string;
  name: string;
  rank: string;
  division: string;
  clearance: string;
  email: string;
  phone: string;
  lastLogin: string;
  lastSync: string;
  onDuty: boolean;
  activeCases: number;
  linkedCases: string[];
}

export const officerRoster: Officer[] = [
  {
    id: "IO-2847",
    initials: "JD",
    name: "Inspector Jyoti Desai",
    rank: "Inspector",
    division: "Cybercrime & Intelligence Fusion",
    clearance: "Level 4",
    email: "jyoti.desai@forensi-link.gov",
    phone: "+91-22-5558-2847",
    lastLogin: "2025-10-04T09:23:00+05:30",
    lastSync: "2025-10-04T09:48:00+05:30",
    onDuty: true,
    activeCases: 4,
    linkedCases: ["Case 47-VA", "Case 31-AX", "Case 22-MN"],
  },
  {
    id: "IO-1920",
    initials: "AK",
    name: "Assistant Commissioner Arun Khanna",
    rank: "Assistant Commissioner",
    division: "Financial Crimes Directorate",
    clearance: "Level 5",
    email: "arun.khanna@forensi-link.gov",
    phone: "+91-22-5558-1920",
    lastLogin: "2025-10-03T18:42:00+05:30",
    lastSync: "2025-10-03T19:15:00+05:30",
    onDuty: false,
    activeCases: 6,
    linkedCases: ["Case 47-VA", "Case 19-FC", "Case 55-OP"],
  },
  {
    id: "IO-3375",
    initials: "RS",
    name: "Analyst Riya Sethi",
    rank: "Senior Data Analyst",
    division: "Signals Intelligence Lab",
    clearance: "Level 3",
    email: "riya.sethi@forensi-link.gov",
    phone: "+91-22-5558-3375",
    lastLogin: "2025-10-04T07:05:00+05:30",
    lastSync: "2025-10-04T07:20:00+05:30",
    onDuty: true,
    activeCases: 2,
    linkedCases: ["Case 31-AX", "Case 08-RL"],
  },
];

export const defaultOfficerId = "IO-2847";

export const getOfficerById = (id: string): Officer | undefined =>
  officerRoster.find((officer) => officer.id === id);
