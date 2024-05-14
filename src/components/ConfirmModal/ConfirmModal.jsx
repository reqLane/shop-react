import React from 'react';
import './ConfirmModal.css';
const ConfirmModal = ({onClose}) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className='modal-confirm-title'>Thank you for choosing us!</h2>
                <p>Your order #3265897 has been successfully processed.</p>
                <p>Wait for a call from our specialist.</p>
                <button className='continue-btn' onClick={onClose}>Continue shopping</button>
            </div>
        </div>
    );
};

export default ConfirmModal;
