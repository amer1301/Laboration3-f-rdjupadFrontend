# Laboration 3 – Single Page Application med React & TypeScript

Detta projekt är en fullstack-webbapplikation som består av en **React SPA (frontend)** och ett **Node/Express backend-API** med JWT-autentisering. Applikationen är en enkel bloggplattform där användare kan visa inlägg publikt och administrera innehåll efter inloggning.

---

## Funktioner
- Single Page Application byggd med **React + TypeScript**
- Routing med **React Router**
- **JWT-baserad autentisering**
- Skyddade routes för administrativ del
- Full **CRUD** för blogginlägg
- Publika sidor för visning av inlägg
- Responsiv design
- Felhantering och användarfeedback
- Versionshantering med Git

## Projektstruktur
```
Laboration3-fordjupadFrontend/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── models/
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
│
├── public/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── routing/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── App.css
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
```
## Backend – Installation & start
Gå till backend-mappen:
cd backend

Installera beroenden:
npm install

Skapa en .env-fil (eller använd .env.example som mall):
PORT=3000
JWT_SECRET=your_secret_key

Starta servern:
npm run dev

Backend körs då på:
http://localhost:3000

## Frontend – Installation & start
Gå tillbaka till projektets rotmapp:
npm install

Starta utvecklingsserver:
npm run dev

Frontend körs vanligtvis på:
http://localhost:5173

## Demo-inloggning
Använd följande testkonto:

E-post: admin@blogg.se
Lösenord: password

## API Endpoints (Backend)
### Autentisering
- POST /auth/login – logga in och få JWT-token
- GET /auth/validate – validera token
### Blogginlägg (CRUD)
- GET /posts – hämta alla inlägg
- GET /posts/:id – hämta ett inlägg
- POST /posts – skapa inlägg (kräver token)
- PUT /posts/:id – uppdatera inlägg (kräver token)
- DELETE /posts/:id – ta bort inlägg (kräver token)

JWT-token skickas i header:
Authorization: Bearer <token>

## Routing (Frontend)
Publika routes:
- /posts – lista alla inlägg
- /posts/:id – visa enskilt inlägg
- /login – inloggningssida

Skyddad route:
/admin – administrera inlägg (CRUD)

## Teknologier

### Frontend
- React
- TypeScript
- React Router
- Axios
- Vite

### Backend
- Node.js
- Express
