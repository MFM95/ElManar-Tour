// components/FormModal.js
import React, {useState} from 'react';

const FormModal = ({tourTitle, open, onClose}) => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/send-email', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({ tourTitle, name, contactNumber, numberOfGuests, date }),
    });
    if (res.ok) {
      onClose();
      alert('Booked successfully!');
    } else {
      alert('Failed to Book.');
    }
  };

  if (!open) return null; // Don't render the modal if it's not open

  return (<div className="flex flex-col items-center justify-center h-screen">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
          <h2 className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent text-3xl font-bold animate-float">
            Book it
          </h2>
          <h6 className="absolute top left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent text-xl font-bold animate-float max-w-sm line-clamp-2">{tourTitle}</h6>

          <button
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            onClick={onClose}
          >
            ✕
          </button>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="section row pb-0">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Contact Number</label>
              <input
                type='text'
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Number of guests</label>
              <input
                type='number'
                min={1}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Preferred Date</label>
              <input
                type='date'
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center space-x-3">
              {/*<button*/}
              {/*  type="button"*/}
              {/*  className="bg-gray-400 text-white px-4 py-2 rounded-lg"*/}
              {/*  onClick={onClose}*/}
              {/*>*/}
              {/*  Cancel*/}
              {/*</button>*/}
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-900"
              >
                Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>);
};


export default FormModal;



