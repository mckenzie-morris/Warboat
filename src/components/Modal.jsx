import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

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
      <Modal open={open} onClose={handleClose}>
        <div className="fixed left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 bg-red-500">
          <Button
            className="rounded-md bg-green-600 px-4 py-1"
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
