// src/components/EntryList/EntryList.js
import React from 'react';
import { EntryTableRow, EntryCard } from '../EntryItem/EntryItem';
import './EntryList.css';

function EntryList({ entries, onDeleteEntry }) {
  if (entries.length === 0) {
    return <p className="no-entries">No expenses recorded yet. Add one above!</p>;
  }

  // Sort entries by date descending before rendering
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="entry-list-container">
      <h2>Expense History</h2>
      {/* Table view for wider screens */}
      <table className="entry-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Purpose</th>
            <th className="amount-column">Amount</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEntries.map((entry) => (
            <EntryTableRow key={entry.id} entry={entry} onDelete={onDeleteEntry} />
          ))}
        </tbody>
      </table>

      {/* Card view for smaller screens */}
      <div className="entry-cards-container">
        {sortedEntries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} onDelete={onDeleteEntry} />
        ))}
      </div>
    </div>
  );
}

export default EntryList;