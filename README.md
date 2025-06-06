A full-stack shopping list manager built with React + Redux Toolkit + Material UI on the frontend and NestJS + Prisma + PostgreSQL on the backend.  

This application allows users to create, update, complete, and delete shopping list items with a clean UI and responsive behavior.

**Frontend**  
React  
Redux Toolkit  
Material UI   
TypeScript  

**Backend**  
NestJS  
Prisma ORM  
PostgreSQL  
TypeScript  

# Features
- Add, edit, and delete shopping items
- Mark items as "completed"
- Persist data with PostgreSQL
- Fully typed with TypeScript (frontend & backend)
- Mobile-responsive design
- Smooth modal transitions and intuitive UI
- Form validation and helpful UX states

# Getting Started
## Prerequisites
Node.js (v18+)
Yarn or npm
Docker (optional, for PostgreSQL)
PostgreSQL running locally (or via Docker)

## Backend Setup
```
cd server
npm install
cp .env.example .env
```
Update DATABASE_URL with your PostgreSQL credentials

### Generate Prisma client and push schema
```
npx prisma generate
npx prisma db push
```

### Run NestJS backend
`npm run start:dev`

Make sure PostgreSQL is running and accessible from the DATABASE_URL in .env.

## Frontend Setup
`cd client`

### Install dependencies
`npm install`

### Start the development server
`npm run dev`

# API Overview
GET	/shopping-items	Fetch all items  
GET	/shopping-items/:id	Fetch item by ID  
POST	/shopping-items	Create new item  
PUT	/shopping-items/:id	Full update of item  
PATCH	/shopping-items/:id	Partial update of item  
DELETE	/shopping-items/:id	Delete item  

