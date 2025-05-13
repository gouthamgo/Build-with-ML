// src/components/EntryForm/EntryForm.js
import React, { useState } from 'react';
import './EntryForm.css';

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Define common purposes
const COMMON_PURPOSES = [
  "Office Supplies",
  "Software/Subscriptions",
  "Travel (Flights, Hotel)",
  "Meals & Entertainment (Business)",
  "Utilities (Home Office)",
  "Professional Development/Courses",
  "Legal/Professional Fees",
  "Advertising/Marketing",
  "Bank Charges",
  // "Other" will be handled specially
];

const OTHER_OPTION_VALUE = "Other"; // Constant for "Other"

function EntryForm({ onAddEntry }) {
  const [date, setDate] = useState(getTodayDate());
  const [amount, setAmount] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState(COMMON_PURPOSES[0]); // Default to first common purpose
  const [otherPurposeText, setOtherPurposeText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let finalPurpose = selectedPurpose;
    if (selectedPurpose === OTHER_OPTION_VALUE) {
      if (!otherPurposeText.trim()) {
        alert('Please specify the purpose in the "Other" field.');
        return;
      }
      finalPurpose = otherPurposeText.trim().slice(0, 100);
    }

    if (!amount || !finalPurpose) { // finalPurpose now holds the actual purpose string
      alert('Please fill in all required fields.');
      return;
    }

    const newEntry = {
      id: Date.now(), // Simple unique ID using timestamp
      date,
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      purpose: finalPurpose,
    };

    onAddEntry(newEntry);

    // Reset form fields
    setDate(getTodayDate());
    setAmount('');
    setSelectedPurpose(COMMON_PURPOSES[0]); // Reset dropdown
    setOtherPurposeText(''); // Reset other text field
  };

  const handlePurposeChange = (e) => {
    setSelectedPurpose(e.target.value);
    // If user selects something other than "Other", clear the otherPurposeText
    if (e.target.value !== OTHER_OPTION_VALUE) {
      setOtherPurposeText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <h2>Add New Expense</h2>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          step="0.01"
          min="0.01"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="purpose-select">Purpose:</label>
        <select
          id="purpose-select"
          value={selectedPurpose}
          onChange={handlePurposeChange}
          required
        >
          {COMMON_PURPOSES.map((purpose) => (
            <option key={purpose} value={purpose}>
              {purpose}
            </option>
          ))}
          <option value={OTHER_OPTION_VALUE}>{OTHER_OPTION_VALUE}</option>
        </select>
      </div>

      {/* Conditionally render the text input for "Other" purpose */}
      {selectedPurpose === OTHER_OPTION_VALUE && (
        <div className="form-group">
          <label htmlFor="other-purpose">Specify Other Purpose:</label>
          <input
            type="text"
            id="other-purpose"
            value={otherPurposeText}
            onChange={(e) => setOtherPurposeText(e.target.value)}
            placeholder="e.g., Client Gift"
            maxLength="100"
            required // Required only if "Other" is selected
          />
        </div>
      )}

      <button type="submit">Save Expense</button>
    </form>
  );
}

export default EntryForm;