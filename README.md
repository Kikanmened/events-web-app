# Events Web App

This is our React Events Web App.

It uses React, Vite, and TailwindCSS.

It will connect to the provided Events REST API.
Development is done using our local Events API.

The home page loads events with `GET /api/events`.
In development, Vite proxies `/api` to `http://localhost:3000`.
If your API uses another origin, copy `.env.example` to `.env` and set `VITE_API_URL`.