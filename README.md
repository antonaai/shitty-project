# Micro-SaaS MVP - Multi-tenant Business Management Platform

Una piattaforma completa per la gestione aziendale multi-tenant costruita con Next.js 14, TypeScript, e modern UI/UX.

## 🚀 Features

- **Autenticazione Multi-tenant**: Sistema di login con isolamento dati per tenant
- **Dashboard Overview**: KPI cards, grafici ricavi/costi, analytics in tempo reale
- **Gestione Dipendenti**: CRUD completo con ricerca, filtri e forms validati
- **Database Clienti**: Gestione clienti con stati (Attivo, Lead, Inattivo)
- **Sistema Appuntamenti**: Pianificazione appuntamenti con assegnazione dipendenti
- **UI Moderna**: Animazioni fluide, responsive design, dark mode ready
- **Repository Pattern**: Data layer mock-first pronto per DB reale

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui (Radix UI)
- **Authentication**: NextAuth.js
- **Database ORM**: Prisma (SQLite per dev)
- **Charts**: Recharts
- **Animations**: Framer Motion + AOS
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## 🏁 Quick Start

### Prerequisites

- Node.js 18+ e npm installati
- Git

### Installation

1. **Clona il repository**:
```bash
git clone <your-repo-url>
cd "Shitty Project"
```

2. **Installa le dipendenze**:
```bash
npm install
```

3. **Configura le variabili d'ambiente**:
```bash
cp .env.example .env.local
```

Il file `.env.local` dovrebbe contenere:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="demo-secret-key-change-in-production-12345"
```

4. **Genera Prisma Client**:
```bash
npx prisma generate
```

5. **Avvia il server di sviluppo**:
```bash
npm run dev
```

6. **Apri il browser**: [http://localhost:3000](http://localhost:3000)

## 🔐 Credenziali Demo

Per accedere all'applicazione, usa le seguenti credenziali:

- **Email**: `demo@azienda1.com`
- **Password**: `password`

Alternative:
- **Email**: `admin@test.com`
- **Password**: `admin123`

## 📁 Struttura Progetto

```
.
├── app/
│   ├── (public)/              # Pagine pubbliche
│   │   ├── page.tsx          # Homepage
│   │   ├── pricing/          # Prezzi
│   │   ├── features/         # Funzionalità
│   │   ├── about/            # Chi siamo + FAQ
│   │   └── login/            # Login page
│   ├── (protected)/app/       # Area protetta
│   │   └── dashboard/
│   │       ├── page.tsx      # Dashboard overview
│   │       ├── employees/    # Gestione dipendenti
│   │       ├── clients/      # Gestione clienti
│   │       ├── appointments/ # Gestione appuntamenti
│   │       └── settings/     # Impostazioni
│   └── api/
│       └── auth/[...nextauth]/ # NextAuth API routes
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── layout/                # Navbar, Sidebar, Footer
│   └── dashboard/             # Dashboard components
├── features/
│   ├── employees/
│   │   ├── components/       # Employee-specific components
│   │   ├── types.ts          # TypeScript types
│   │   └── repository.ts     # Data access layer
│   ├── clients/
│   └── appointments/
├── lib/
│   ├── auth.ts               # NextAuth configuration
│   ├── prisma.ts             # Prisma client
│   ├── tenant.ts             # Multi-tenant utilities
│   ├── mock-db.ts            # Mock data
│   └── utils.ts              # Helper functions
├── prisma/
│   └── schema.prisma         # Database schema
└── middleware.ts             # Route protection
```

## 🎨 Pagine Implementate

### Pubbliche
- `/` - Homepage con animazioni AOS
- `/pricing` - Piani tariffari
- `/features` - Lista funzionalità
- `/about` - Chi siamo + FAQ
- `/login` - Autenticazione

### Protette (richiede login)
- `/app/dashboard` - Dashboard overview con KPI
- `/app/dashboard/employees` - Gestione dipendenti
- `/app/dashboard/clients` - Gestione clienti
- `/app/dashboard/appointments` - Gestione appuntamenti
- `/app/dashboard/settings` - Impostazioni account

## 🔧 Scripts Disponibili

```bash
# Development
npm run dev          # Avvia server dev

# Build
npm run build        # Build per produzione
npm start            # Avvia server produzione

# Database
npm run db:push      # Applica schema al DB
npm run db:studio    # Apri Prisma Studio

# Linting
npm run lint         # Esegui ESLint
```

## 📊 Features Dashboard

### KPI Cards (6)
- Ricavi Totali
- Costi Totali
- Profitto
- Dipendenti Attivi
- Clienti Totali
- Appuntamenti Oggi

### Grafici
- Line Chart ricavi/costi (ultimi 6 mesi)
- Toggle visualizzazione Entrambi/Ricavi/Costi

### Tabelle
- Prossimi Appuntamenti (5 più recenti)
- Clienti Recenti (ultimi 4 aggiunti)

## 🗄️ Data Layer

Il progetto usa un **Repository Pattern** con dati mock in memoria. È pronto per essere sostituito con query Prisma reali:

```typescript
// Attuale (Mock)
export const employeesRepository = {
  async getAll(tenantId: string) {
    return MOCK_EMPLOYEES.filter(e => e.companyId === tenantId)
  }
}

// Futuro (Prisma)
export const employeesRepository = {
  async getAll(tenantId: string) {
    return prisma.employee.findMany({ 
      where: { companyId: tenantId } 
    })
  }
}
```

Tutti i repository sono in `features/*/repository.ts` con TODO chiari per il passaggio a DB reale.

## 🔒 Multi-tenancy

Il sistema implementa un'architettura multi-tenant sicura:

1. **Session-level isolation**: `tenantId` e `companyId` nella JWT session
2. **Middleware protection**: Tutte le rotte `/app/*` richiedono autenticazione
3. **Data filtering**: Ogni query filtra automaticamente per `companyId`

```typescript
// Middleware automatico
export { default } from "next-auth/middleware"
export const config = { matcher: ["/app/:path*"] }

// Helper per ottenere tenant corrente
const user = await getCurrentUser()
const data = await repository.getAll(user.tenantId)
```

## 🎭 Animazioni

- **AOS**: Animazioni on-scroll per homepage e pagine marketing
- **Framer Motion**: Transizioni fluide per dashboard, cards, modals
- **Micro-interactions**: Hover effects, focus states, loading states

## 📱 Responsive Design

- **Mobile-first approach**
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Mobile sidebar**: Drawer collapsible per schermi piccoli
- **Responsive tables**: Scroll orizzontale su mobile

## ♿ Accessibilità

- Focus states visibili
- ARIA labels su elementi interattivi
- Navigazione tastiera completa (Tab, Enter, Esc)
- Contrasto colori WCAG AA

## 🚧 TODO: Passaggio a Produzione

1. **Database**:
   - [ ] Configurare PostgreSQL/MySQL
   - [ ] Sostituire mock repositories con query Prisma
   - [ ] Eseguire migrations: `npx prisma migrate dev`

2. **Authentication**:
   - [ ] Configurare provider OAuth (Google, GitHub)
   - [ ] Implementare reset password
   - [ ] Aggiungere 2FA

3. **Backend**:
   - [ ] Creare API routes per CRUD
   - [ ] Implementare rate limiting
   - [ ] Aggiungere validazione server-side

4. **Deploy**:
   - [ ] Configurare Vercel/Railway/AWS
   - [ ] Setup CI/CD
   - [ ] Configurare monitoring (Sentry)

5. **Features Aggiuntive**:
   - [ ] Notifiche real-time
   - [ ] Export dati (CSV, PDF)
   - [ ] Calendar view per appuntamenti
   - [ ] File upload (avatar, documenti)
   - [ ] Inviti team members

## 🤝 Contributing

Questo è un boilerplate MVP. Sentiti libero di:
- Forkare il progetto
- Creare feature branches
- Aprire Pull Requests
- Segnalare bugs

## 📝 License

MIT License - sentiti libero di usare questo progetto per scopi personali o commerciali.

## 💡 Support

Per domande o supporto:
- Email: support@micro-saas.com
- GitHub Issues: [Apri un issue](https://github.com/your-repo/issues)

---

**Built with ❤️ using Next.js 14 and TypeScript**
