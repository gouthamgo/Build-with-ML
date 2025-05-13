// src/components/EntryItem/EntryItem.js
import React from 'react';
import './EntryItem.css';

// Simple Trash Can SVG Icon
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
    <path d="M3 6v18h18V6H3zm5 14H6v-9h2v9zm5 0h-2v-9h2v9zm5 0h-2v-9h2v9zM19 2H5c-1.1 0-2 .9-2 2v2h20V4c0-1.1-.9-2-2-2zM8 4h8v1H8V4z"/>
  </svg>
);


// Helper to format date string (e.g., "Apr 20, 2024")
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// For Table Row
export function EntryTableRow({ entry, onDelete }) {
  return (
    <tr>
      <td>{formatDate(entry.date)}</td>
      <td>{entry.purpose}</td>
      <td className="amount-column">${entry.amount.toFixed(2)}</td>
      <td className="actions-column">
        <button onClick={() => onDelete(entry.id)} className="delete-button" title="Delete Entry">
          <TrashIcon />
        </button>
      </td>
    </tr>
  );
}

// For Card View
export function EntryCard({ entry, onDelete }) {
  return (
    <div className="entry-card">
      <div className="card-row">
        <span className="card-label">Date:</span>
        <span className="card-value">{formatDate(entry.date)}</span>
      </div>
      <div className="card-row">
        <span className="card-label">Purpose:</span>
        <span className="card-value card-purpose">{entry.purpose}</span>
      </div>
      <div className="card-row">
        <span className="card-label">Amount:</span>
        <span className="card-value">${entry.amount.toFixed(2)}</span>
      </div>
      <div className="card-actions">
        <button onClick={() => onDelete(entry.id)} className="delete-button" title="Delete Entry">
          <TrashIcon /> Delete
        </button>
      </div>
    </div>
  );
}