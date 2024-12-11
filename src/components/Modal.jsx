import { Modal } from '@mui/base/Modal';
import { Button } from '@mui/base/Button';
// utility for constructing className strings conditionally
import clsx from 'clsx';


function ReusableModal() {
  const [openOrClosed, setOpenOrClosed] = React.useState(false);
  const handleOpen = () => setOpenOrClosed(true);
  const handleClose = () => setOpenOrClosed(false);

  return (
    <div>
      <Button
        className='bg-green-600 rounded-md py-1 px-4'
        onClick={handleOpen}
      >
        Choose Theme!
      </Button>
      <Modal
        open={openOrClosed}
        onClose={handleClose}
        slots={{ backdrop: (props) => <Backdrop {...props} handleClose={handleClose} /> }}
      >
        <div className='h-[250px] fixed z-10 w-[250px] bg-red-500'>
          <Button
            className='bg-green-600 rounded-md py-1 px-4'
            onClick={handleClose}
          >
            Close!
          </Button>
        </div>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { openOrClosed, handleClose } = props;
  return (
    <div
      onClick={() => {handleClose()}}
      className={clsx('fixed inset-0 bg-black bg-opacity-50 ', {
        'base-Backdrop-open': openOrClosed,
      })}
    ></div>
  );
});

export default ReusableModal;
