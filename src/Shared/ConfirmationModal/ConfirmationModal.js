import React from 'react';

const ConfirmationModal = ({ title, message, cancelModal, deleteAction, doctorData }) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="text-error font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={cancelModal} htmlFor="confirmation-modal" className="btn btn-error btn-outline">CANCEL</label>
                        <label onClick={() => deleteAction(doctorData)} htmlFor="confirmation-modal" className="btn btn-error">DELETE</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;