# Laboration 3 – Single Page Application med React & TypeScript

Detta projekt är en fullstack-webbapplikation som består av en **React SPA (frontend)** och ett **Node/Express backend-API** med JWT-autentisering. Applikationen är en enkel bloggplattform där användare kan visa inlägg publikt och administrera innehåll efter inloggning.

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

---
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
---
## Backend – Installation & start
***
