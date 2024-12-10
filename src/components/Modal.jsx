
import { Modal } from '@mui/base/Modal';
import { useState } from 'react';

function CustomModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className='bg-green-600 rounded-md py-1 px-4' onClick={handleOpen}>Open Modal</button>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        slots={{ backdrop: 'div' }} // Optional: Define the backdrop if needed
      >
        {/* Content inside the modal */}
        <div style={{ padding: '16px', backgroundColor: 'red', borderRadius: '8px' }}>
          <h2>Modal Title</h2>
          <p>Modal content goes here.</p>
          <button className='bg-green-600 rounded-md py-1 px-4' onClick={handleClose}>Close Modal</button>
        </div>
      </Modal>
    </div>
  );
}

export default CustomModal