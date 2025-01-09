import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Carousel from "./Carousel.jsx";

function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        className="rounded-md bg-green-600 px-4 py-1"
        onClick={handleOpen}
      >
        Open modal
      </Button>
      {/* change open={true} to open={open} after finishing edits */}
      <Modal open={open} onClose={handleClose}>
        <div
          id="modal-content"
          className="fixed left-1/2 top-1/2 flex max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 flex-col justify-center bg-gray-500"
        >
          <Carousel />
          <div className="mx-auto">
            <Button
              className="mx-3 mb-5 mt-10 rounded-md bg-green-600 px-4 py-1"
              onClick={handleClose}
            >
              Close!
            </Button>
            <Button className="mx-3 mb-5 mt-10 rounded-md bg-green-600 px-4 py-1">
              Apply!
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BasicModal;
