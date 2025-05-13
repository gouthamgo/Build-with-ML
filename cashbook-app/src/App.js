// src/App.js
import React, { useState, useEffect, useMemo } from 'react';
import EntryForm from './components/EntryForm/EntryForm';
import EntryList from './components/EntryList/EntryList';
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal';
import './App.css';

const LOCAL_STORAGE_KEY = 'cashbookEntries';

function App() {
  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entryToDeleteId, setEntryToDeleteId] = useState(null);

  // Load entries from localStorage on initial render
  useEffect(() => {
    const storedEntries = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedEntries) {
      try {
        setEntries(JSON.parse(storedEntries));
      } catch (error) {
        console.error("Error parsing entries from localStorage:", error);
        setEntries([]); // Fallback to empty array on error
      }
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  // Function to add a new entry
  const addEntry = (newEntry) => {
    // Add to the beginning for a default descending sort feel,
    // but the list component will sort explicitly
    setEntries((prevEntries) => [newEntry, ...prevEntries]);
  };

  // Function to initiate deletion (opens modal)
  const handleDeleteRequest = (id) => {
    setEntryToDeleteId(id);
    setIsModalOpen(true);
  };

  // Function to confirm and perform deletion
  const confirmDeleteEntry = () => {
    if (entryToDeleteId !== null) {
      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== entryToDeleteId)
      );
    }
    setIsModalOpen(false);
    setEntryToDeleteId(null);
  };

  // Function to cancel deletion
  const cancelDelete = () => {
    setIsModalOpen(false);
    setEntryToDeleteId(null);
  };

  // Calculate total sum of amounts
  // useMemo ensures this is only recalculated when entries change
  const totalAmount = useMemo(() => {
    return entries.reduce((sum, entry) => sum + entry.amount, 0);
  }, [entries]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Cashbook: Tax Expenses</h1>
      </header>

      <EntryForm onAddEntry={addEntry} />

      <div className="total-expenses">
        Total Expenses: ${totalAmount.toFixed(2)}
      </div>

      <EntryList entries={entries} onDeleteEntry={handleDeleteRequest} />

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this entry?"
        onConfirm={confirmDeleteEntry}
        onCancel={cancelDelete}
      />
    </div>
  );
}

export default App;