/**
 * components/IssueForm.js
 * ---------------------------------------------------------------
 * Accessibility-issue reporting form.
 *
 * Collects: location, issue type, optional image.
 * On submit → calls POST /reportIssue via api.js
 * ---------------------------------------------------------------
 */

import React, { useState } from 'react';
import { reportIssue } from '../services/api';

const ISSUE_TYPES = [
  'Broken Elevator',
  'Blocked Ramp',
  'Narrow Passage',
  'Construction Obstruction',
  'Damaged Pathway',
];

// Example campus locations – replace with real data from your campus
const LOCATIONS = [
  'Main Library',
  'Science Building',
  'Student Center',
  'Engineering Hall',
  'Arts Building',
  'Sports Complex',
  'Parking Garage A',
  'Dormitory West',
  'Administration Block',
  'Cafeteria',
];

const IssueForm = () => {
  const [location, setLocation] = useState('');
  const [issueType, setIssueType] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location || !issueType) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Build form data (supports optional image upload)
      const formData = new FormData();
      formData.append('location', location);
      formData.append('issueType', issueType);
      if (image) formData.append('image', image);

      await reportIssue(formData);

      setStatus({ type: 'success', message: '✅ Issue reported successfully! Thank you.' });
      setLocation('');
      setIssueType('');
      setImage(null);
    } catch (err) {
      setStatus({
        type: 'error',
        message: '❌ Failed to submit. Please try again later.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-4 animate-in">
      {/* Location */}
      <div className="mb-3">
        <label className="form-label" style={{ color: 'var(--accent)', fontWeight: 600 }}>
          Location *
        </label>
        <select
          className="form-acns"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          id="issue-location"
        >
          <option value="">— Select location —</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Issue Type */}
      <div className="mb-3">
        <label className="form-label" style={{ color: 'var(--accent)', fontWeight: 600 }}>
          Issue Type *
        </label>
        <select
          className="form-acns"
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
          id="issue-type"
        >
          <option value="">— Select issue type —</option>
          {ISSUE_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="form-label" style={{ color: 'var(--text-secondary)' }}>
          Attach Photo (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          className="form-acns"
          onChange={(e) => setImage(e.target.files[0] || null)}
          id="issue-image"
        />
      </div>

      {/* Feedback */}
      {status.message && (
        <div
          className={`mb-3 p-3 rounded ${
            status.type === 'success'
              ? 'text-success'
              : 'text-danger'
          }`}
          style={{
            background:
              status.type === 'success'
                ? 'rgba(0,230,118,.1)'
                : 'rgba(255,82,82,.1)',
          }}
        >
          {status.message}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="btn-acns btn-acns-primary w-100"
        disabled={submitting}
        id="submit-issue-btn"
      >
        {submitting ? 'Submitting…' : '🚀 Submit Report'}
      </button>
    </form>
  );
};

export default IssueForm;
