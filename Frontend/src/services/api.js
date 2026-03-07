/**
 * services/api.js
 * ---------------------------------------------------------------
 * Centralised API service layer.
 * Every backend interaction goes through this file.
 * Functions only make HTTP calls and return data – NO business logic.
 * ---------------------------------------------------------------
 */

import axios from 'axios';

// Base URL – change this to point at the real backend once deployed.
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

/* ----------------------------------------------------------------
   ROUTE
   POST /route  – request an accessible route between two locations
   ---------------------------------------------------------------- */
export const getRoute = async (start, destination) => {
  const response = await API.post('/route', { start, destination });
  return response.data;
};

/* ----------------------------------------------------------------
   ISSUES
   POST /reportIssue  – submit a new accessibility issue
   GET  /issues        – fetch all reported issues
   ---------------------------------------------------------------- */
export const reportIssue = async (issueData) => {
  // issueData may be a FormData object (when image is attached)
  const config = issueData instanceof FormData
    ? { headers: { 'Content-Type': 'multipart/form-data' } }
    : {};
  const response = await API.post('/reportIssue', issueData, config);
  return response.data;
};

export const getIssues = async () => {
  const response = await API.get('/issues');
  return response.data;
};

/* ----------------------------------------------------------------
   LEADERBOARD
   GET /leaderboard  – fetch gamification leaderboard
   ---------------------------------------------------------------- */
export const getLeaderboard = async () => {
  const response = await API.get('/leaderboard');
  return response.data;
};

/* ----------------------------------------------------------------
   AUTH (placeholder)
   POST /login  – authenticate user
   ---------------------------------------------------------------- */
export const loginUser = async (credentials) => {
  const response = await API.post('/login', credentials);
  return response.data;
};

export default API;
