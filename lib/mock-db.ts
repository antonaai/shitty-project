// Mock database for development
// TODO: Replace with real Prisma queries in production

export interface MockEmployee {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  hireDate: string
  companyId: string
  createdAt: string
}

export interface MockClient {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  status: "active" | "inactive" | "lead"
  companyId: string
  createdAt: string
}

export interface MockAppointment {
  id: string
  clientId: string
  employeeId: string
  date: string
  time: string
  notes: string
  status: "scheduled" | "completed" | "cancelled"
  companyId: string
  createdAt: string
}

// Mock Employees Data
export const MOCK_EMPLOYEES: MockEmployee[] = [
  {
    id: "emp_1",
    firstName: "Luca",
    lastName: "Bianchi",
    email: "luca.bianchi@azienda1.com",
    phone: "+39 340 123 4567",
    role: "Tecnico Senior",
    hireDate: "2020-03-15",
    companyId: "company_1",
    createdAt: "2020-03-15T10:00:00Z",
  },
  {
    id: "emp_2",
    firstName: "Giulia",
    lastName: "Verdi",
    email: "giulia.verdi@azienda1.com",
    phone: "+39 345 987 6543",
    role: "Commerciale",
    hireDate: "2021-06-01",
    companyId: "company_1",
    createdAt: "2021-06-01T09:00:00Z",
  },
  {
    id: "emp_3",
    firstName: "Marco",
    lastName: "Neri",
    email: "marco.neri@azienda1.com",
    phone: "+39 348 555 7777",
    role: "Tecnico",
    hireDate: "2022-01-10",
    companyId: "company_1",
    createdAt: "2022-01-10T08:30:00Z",
  },
  {
    id: "emp_4",
    firstName: "Sara",
    lastName: "Russo",
    email: "sara.russo@azienda1.com",
    phone: "+39 342 111 2222",
    role: "Amministrazione",
    hireDate: "2019-09-20",
    companyId: "company_1",
    createdAt: "2019-09-20T10:00:00Z",
  },
]

// Mock Clients Data
export const MOCK_CLIENTS: MockClient[] = [
  {
    id: "client_1",
    name: "Rossi Impianti SRL",
    email: "info@rossiimpianti.it",
    phone: "+39 02 1234 5678",
    address: "Via Roma 123",
    city: "Milano",
    zipCode: "20100",
    status: "active",
    companyId: "company_1",
    createdAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "client_2",
    name: "Condominio Verde",
    email: "amministrazione@condominioverde.it",
    phone: "+39 02 9876 5432",
    address: "Via Garibaldi 45",
    city: "Milano",
    zipCode: "20121",
    status: "active",
    companyId: "company_1",
    createdAt: "2023-02-20T11:00:00Z",
  },
  {
    id: "client_3",
    name: "Azienda Beta SPA",
    email: "contatti@aziendabeta.it",
    phone: "+39 02 5555 6666",
    address: "Corso Italia 78",
    city: "Milano",
    zipCode: "20122",
    status: "lead",
    companyId: "company_1",
    createdAt: "2024-01-05T14:30:00Z",
  },
  {
    id: "client_4",
    name: "Hotel Centrale",
    email: "info@hotelcentrale.it",
    phone: "+39 02 3333 4444",
    address: "Piazza Duomo 10",
    city: "Milano",
    zipCode: "20123",
    status: "active",
    companyId: "company_1",
    createdAt: "2023-06-10T09:00:00Z",
  },
  {
    id: "client_5",
    name: "Officina Meccanica Gamma",
    email: "info@officinagamma.it",
    phone: "+39 02 7777 8888",
    address: "Via Lorenteggio 200",
    city: "Milano",
    zipCode: "20147",
    status: "inactive",
    companyId: "company_1",
    createdAt: "2022-11-20T10:30:00Z",
  },
]

// Mock Appointments Data
export const MOCK_APPOINTMENTS: MockAppointment[] = [
  {
    id: "appt_1",
    clientId: "client_1",
    employeeId: "emp_1",
    date: "2024-01-22",
    time: "09:00",
    notes: "Manutenzione ordinaria impianto elettrico",
    status: "scheduled",
    companyId: "company_1",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "appt_2",
    clientId: "client_2",
    employeeId: "emp_3",
    date: "2024-01-22",
    time: "14:00",
    notes: "Riparazione guasto condizionamento",
    status: "scheduled",
    companyId: "company_1",
    createdAt: "2024-01-16T11:00:00Z",
  },
  {
    id: "appt_3",
    clientId: "client_4",
    employeeId: "emp_1",
    date: "2024-01-23",
    time: "10:00",
    notes: "Sopralluogo per preventivo",
    status: "scheduled",
    companyId: "company_1",
    createdAt: "2024-01-17T09:00:00Z",
  },
  {
    id: "appt_4",
    clientId: "client_1",
    employeeId: "emp_3",
    date: "2024-01-20",
    time: "11:00",
    notes: "Installazione nuovi interruttori",
    status: "completed",
    companyId: "company_1",
    createdAt: "2024-01-10T14:00:00Z",
  },
  {
    id: "appt_5",
    clientId: "client_3",
    employeeId: "emp_2",
    date: "2024-01-19",
    time: "15:00",
    notes: "Presentazione offerta commerciale",
    status: "completed",
    companyId: "company_1",
    createdAt: "2024-01-12T10:30:00Z",
  },
]

// Helper functions to simulate async database operations
export function delay(ms: number = 100): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
