/**
 * components/Leaderboard.js
 * ---------------------------------------------------------------
 * Renders the gamification leaderboard table.
 *
 * Props:
 *   data  – array of { rank, username, points }
 *   loading – boolean
 * ---------------------------------------------------------------
 */

import React from 'react';

const medal = (rank) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank;
};

const Leaderboard = ({ data = [], loading = false }) => {
  if (loading) {
    return (
      <div className="text-center py-5" style={{ color: 'var(--text-secondary)' }}>
        <div className="spinner-border text-info" role="status" />
        <p className="mt-3">Loading leaderboard…</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-5" style={{ color: 'var(--text-secondary)' }}>
        No leaderboard data yet.
      </div>
    );
  }

  return (
    <div className="glass-card p-0 overflow-hidden animate-in">
      <table className="table-acns">
        <thead>
          <tr>
            <th style={{ width: '80px' }}>Rank</th>
            <th>User</th>
            <th style={{ textAlign: 'right', width: '120px' }}>Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, i) => (
            <tr key={entry.username || i}>
              <td style={{ fontSize: '1.25rem', textAlign: 'center' }}>
                {medal(entry.rank ?? i + 1)}
              </td>
              <td style={{ fontWeight: 600 }}>{entry.username}</td>
              <td
                style={{
                  textAlign: 'right',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {entry.points?.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
