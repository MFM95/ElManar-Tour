// // components/Modal.js
// import React from 'react';
//
// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;
//
//   return (
//     <div style={overlayStyle}>
//       <div style={modalStyle}>
//         <button onClick={onClose} style={closeButtonStyle}>Close</button>
//         {children}
//       </div>
//     </div>
//   );
// };
//
// const overlayStyle = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
// };
//
// const modalStyle = {
//   background: '#fff',
//   padding: '20px',
//   borderRadius: '5px',
//   minWidth: '300px',
// };
//
// const closeButtonStyle = {
//   marginBottom: '10px',
// };
//
// export default Modal;

// app/components/Modal.js
'use client';

import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  // Close the modal when the Escape key is pressed
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Focus the modal when it opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
        ref={modalRef}
        tabIndex="-1"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
