import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const ModularModal = ({
  displayTextOpenButton,
  displayTextCloseButton,
  modalContent,
  alternativeContent,
  closeCondition,
  openOrClosed
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true)
    openOrClosed?.(true)
  };
  const handleClose = () => {
    setOpen(false)
    openOrClosed?.(false)
  };
  React.useEffect(() => {
    if (closeCondition === true) {
      setOpen(false);
    }
  }, [closeCondition]);

  return (
    <div>
      <Button
        className="rounded-md bg-green-600 px-4 py-1"
        onClick={handleOpen}
      >
        {displayTextOpenButton}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div
          id="modal-content"
          className="fixed left-1/2 top-1/2 flex max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 flex-col justify-center bg-gray-500"
        >
          {alternativeContent ? (
            <h1 className="text-9xl">{alternativeContent}</h1>
          ) : (
            /* <></> (shorthand for <Fragment></Fragment>) has no effect on the resulting DOM; 
            it is the same as if the elements were not grouped. */
            <>
              {modalContent}
              <Button
                className="mx-auto mb-5 mt-10 rounded-md bg-green-600 px-4 py-1"
                onClick={handleClose}
              >
                {displayTextCloseButton}
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ModularModal;
