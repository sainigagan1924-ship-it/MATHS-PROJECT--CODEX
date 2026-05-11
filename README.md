# Statistics Calculator Platform

A clean full-stack statistics calculator inspired by the direct, calculator-first experience of StandardDeviationCalculator.io. It supports hypothesis tests, z-tests, t-tests, chi-square, and ANOVA with formulas, manual steps, graph data, critical values, p-values, related tables, PDF export, recent history, dark mode, and shareable results.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Recharts, KaTeX
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Statistics: manual formulas plus library-backed distribution helpers through `jstat`

## Setup

```bash
npm run install:all
cp server/.env.example server/.env
npm run dev
```

Frontend runs on `http://localhost:5173`.
Backend runs on `http://localhost:5001`.

## Environment

Set `MONGO_URI` in `server/.env`. If MongoDB is unavailable, calculations still work, but history saves will return a database error.

## API Routes

- `GET /api/tests` lists supported tests and fields
- `POST /api/calculate` calculates a selected test and saves it
- `GET /api/history` returns recent saved calculations
- `GET /api/history/:id` returns one saved calculation
- `GET /api/tables/:testId` returns the related statistical table

## Deployment

1. Create a MongoDB Atlas database and copy the connection string.
2. Deploy `server` to Render, Railway, Fly.io, or a Node-capable host.
3. Set `MONGO_URI`, `CLIENT_URL`, and `PORT` environment variables.
4. Deploy `client` to Vercel/Netlify.
5. Set `VITE_API_URL` to the backend URL.
6. Run `npm run build --prefix client`.

## Notes

The calculators intentionally stay focused: inputs, table modal, result, formula, graph, and interpretation. The UI avoids dashboards and decorative sections so students can get answers quickly.
