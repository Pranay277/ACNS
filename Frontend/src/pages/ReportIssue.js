/**
 * pages/ReportIssue.js
 * ---------------------------------------------------------------
 * Wrapper page that renders the IssueForm component.
 * ---------------------------------------------------------------
 */

import React from 'react';
import IssueForm from '../components/IssueForm';

const ReportIssue = () => {
  return (
    <div className="page-wrapper">
      <div className="animate-in">
        <h1 className="page-title">Report an Accessibility Issue</h1>
        <p className="page-subtitle">
          Help improve campus accessibility by reporting barriers and hazards
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          <IssueForm />
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
