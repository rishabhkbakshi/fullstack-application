import './DeleteUserConfirmationPopup.css';
import { Button, Modal } from 'react-bootstrap';

function DeleteUserConfirmationPopup(props: {
  show: boolean;
  onBtnClick: (action: string) => void;
}) {
  return (
    <>
      <Modal show={props.show} onHide={() => props.onBtnClick('Cancel')} animation={false}>
        <Modal.Body>Are you sure, you want to delete this user ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => props.onBtnClick('Yes')}>
            Yes
          </Button>
          <Button variant="secondary" onClick={() => props.onBtnClick('Cancel')}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUserConfirmationPopup;
