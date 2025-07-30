import './DeleteUserConfirmationPopup.css';
import { Button, Modal } from 'react-bootstrap';

function DeleteUserConfirmationPopup() {

  return <Modal
    // {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Body>
      <p>
        Are you sure you want to delete this user? This action cannot be undone.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button type='button' size='sm' variant='primary' tabIndex={1} onClick={() => console.log('Confirm action')}>Yes</Button>
      <Button type='button' size='sm' variant='outline-primary'
        onClick={() => console.log('Close Popup')}>Cancel </Button>
    </Modal.Footer>
  </Modal>
}

export default DeleteUserConfirmationPopup;
