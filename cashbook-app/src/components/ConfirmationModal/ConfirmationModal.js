// src/components/ConfirmationModal/ConfirmationModal.js
import React from 'react';
import './ConfirmationModal.css';

function ConfirmationModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onCancel}> {/* Optional: close on overlay click */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent click through */}
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button onClick={onConfirm} className="confirm-button">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;