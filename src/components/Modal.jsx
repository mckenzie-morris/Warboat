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
      <Modal open={true} onClose={handleClose}>
        <div className="fixed left-1/2 top-1/2 flex max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 flex-col justify-center bg-gray-500">
          <Carousel />
          <Button
            className="mx-auto rounded-md bg-green-600 px-4 py-1 mt-5"
            onClick={handleClose}
          >
            Close!{" "}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default BasicModal;
