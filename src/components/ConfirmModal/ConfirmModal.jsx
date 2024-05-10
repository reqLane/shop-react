import React from 'react';
import './ConfirmModal.css';
const ConfirmModal = ({onClose}) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className='modal-confirm-title'>Дякуємо, що вибрали нас!</h2>
                <p>Ваше замовлення №3265897 успішно оформлене.</p>
                <p>Чекайте на дзвінок від нашого фахівця.</p>
                <button className='continue-btn' onClick={onClose}>Продовжити покупки</button>
            </div>
        </div>
    );
};

export default ConfirmModal;
