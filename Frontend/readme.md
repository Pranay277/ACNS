# ACNS – Accessible Campus Navigation System (Frontend)

A premium, dark-themed React frontend for campus accessibility navigation.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env
# Edit .env and add your Mapbox token + backend URL

# 3. Start development server
npm start
```

The app opens at **http://localhost:3000**.

## Tech Stack

| Tool             | Purpose                    |
| ---------------- | -------------------------- |
| React 18         | UI framework               |
| React Router 6   | Client-side routing        |
| Axios            | HTTP client (API calls)    |
| Mapbox GL JS 3   | Interactive campus map     |
| Chart.js 4       | Admin analytics charts     |
| Bootstrap 5      | Responsive grid & helpers  |

## Project Structure

```
src/
├── components/
│   ├── Navbar.js        – Sticky top nav with routing links
│   ├── MapView.js       – Mapbox GL map wrapper
│   ├── IssueForm.js     – Accessibility issue report form
│   ├── Leaderboard.js   – Leaderboard table component
│   └── IssueTable.js    – Issues table with status badges
├── pages/
│   ├── Home.js          – Campus map + route finder
│   ├── ReportIssue.js   – Issue reporting page
│   ├── LeaderboardPage.js – Gamification leaderboard
│   ├── AdminDashboard.js  – Charts + issue overview
│   └── Login.js         – Authentication form
├── services/
│   └── api.js           – Centralised Axios API layer
├── App.js               – Router configuration
├── index.js             – React entry point
└── index.css            – Global design system
```

## API Endpoints Used

| Method | Endpoint        | Used By           |
| ------ | --------------- | ----------------- |
| POST   | `/route`        | Home page         |
| POST   | `/reportIssue`  | IssueForm         |
| GET    | `/leaderboard`  | LeaderboardPage   |
| GET    | `/issues`       | AdminDashboard    |
| POST   | `/login`        | Login page        |

> **Note:** This frontend does NOT implement any backend logic. It only calls the above API endpoints and displays their responses.

## Environment Variables

| Variable                 | Description                       |
| ------------------------ | --------------------------------- |
| `REACT_APP_API_URL`      | Backend API base URL              |
| `REACT_APP_MAPBOX_TOKEN` | Mapbox GL JS public access token  |
