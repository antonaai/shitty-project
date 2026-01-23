# Sistema di Autenticazione

## Panoramica

Il progetto utilizza NextAuth per gestire l'autenticazione, integrato con l'API backend esterna ospitata su `https://shitty-project-be.onrender.com`.

## Flusso di Autenticazione

1. L'utente inserisce email e password nella pagina di login
2. Le credenziali vengono inviate all'API backend `/auth/login`
3. L'API restituisce:
   - `accessToken`: Token JWT per le richieste autenticate
   - `refreshToken`: Token per rinnovare l'accessToken
   - Dati dell'utente (id, email, nome, companyName, tenantId, companyId)
4. I token vengono salvati nella sessione NextAuth (cookie HTTP-only sicuri)

## Credenziali Demo

```
Email: admin@acme.it
Password: prova
```

## Utilizzo Client-Side

### Hook useApiClient

Per effettuare chiamate API autenticate nei componenti client:

```typescript
"use client"

import { useApiClient } from "@/hooks/use-api-client"

export const MyComponent = () => {
  const api = useApiClient()

  const fetchData = async () => {
    try {
      const data = await api.get('/your-endpoint')
      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return (
    <button onClick={fetchData}>
      Carica Dati
    </button>
  )
}
```

### Hook useAccessToken

Per ottenere solo l'accessToken:

```typescript
"use client"

import { useAccessToken } from "@/hooks/use-api-client"

export const MyComponent = () => {
  const accessToken = useAccessToken()

  // Usa il token per richieste personalizzate
  const customRequest = async () => {
    const response = await fetch('https://api.example.com/data', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    return response.json()
  }

  return <div>...</div>
}
```

## Utilizzo Server-Side

### Server Components e API Routes

Per effettuare chiamate API autenticate in server components o API routes:

```typescript
import { getApiClient } from "@/lib/api-client"

export default async function MyServerComponent() {
  const api = await getApiClient()
  
  try {
    const data = await api.get('/your-endpoint')
    
    return (
      <div>
        <h1>Dati: {JSON.stringify(data)}</h1>
      </div>
    )
  } catch (error) {
    return <div>Errore nel caricamento dei dati</div>
  }
}
```

### Ottenere solo l'AccessToken

```typescript
import { getAccessToken } from "@/lib/api-client"

export async function GET() {
  const accessToken = await getAccessToken()
  
  if (!accessToken) {
    return new Response("Unauthorized", { status: 401 })
  }

  // Usa il token per richieste personalizzate
  const response = await fetch('https://api.example.com/data', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  
  const data = await response.json()
  return Response.json(data)
}
```

## Metodi API Client

Il client API fornisce i seguenti metodi:

- `get(endpoint, options?)` - GET request
- `post(endpoint, data?, options?)` - POST request
- `put(endpoint, data?, options?)` - PUT request
- `delete(endpoint, options?)` - DELETE request

Tutti i metodi:
- Aggiungono automaticamente l'`Authorization` header con il Bearer token
- Gestiscono il Content-Type come `application/json`
- Lanciano errori se la risposta non è OK
- Parsano automaticamente la risposta JSON

## Accesso ai Dati della Sessione

### Client-Side

```typescript
"use client"

import { useSession } from "next-auth/react"

export const MyComponent = () => {
  const { data: session } = useSession()

  if (!session) {
    return <div>Non autenticato</div>
  }

  return (
    <div>
      <p>Benvenuto, {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      <p>Azienda: {session.user.companyName}</p>
      <p>Tenant ID: {session.user.tenantId}</p>
    </div>
  )
}
```

### Server-Side

```typescript
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function MyServerComponent() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>Non autenticato</div>
  }

  return (
    <div>
      <p>Benvenuto, {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      <p>Azienda: {session.user.companyName}</p>
    </div>
  )
}
```

## Sicurezza

- L'`accessToken` e il `refreshToken` sono salvati nel JWT di NextAuth
- I cookie della sessione sono HTTP-only e non accessibili da JavaScript
- I token non vengono mai esposti nel localStorage o sessionStorage del browser
- Tutte le richieste API utilizzano HTTPS

## Gestione degli Errori

Il client API lancia errori quando:
- L'utente non è autenticato
- La risposta dell'API non è OK (status code 4xx o 5xx)

Esempio di gestione errori:

```typescript
const api = useApiClient()

try {
  const data = await api.get('/endpoint')
  // Gestisci i dati
} catch (error) {
  if (error.message.includes("No access token")) {
    // Reindirizza al login
    router.push('/login')
  } else {
    // Gestisci altri errori
    console.error("API Error:", error)
  }
}
```
