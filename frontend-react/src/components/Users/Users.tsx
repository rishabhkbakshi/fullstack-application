import React, { useEffect, useState, useCallback } from 'react';
import { Button, Col, Form, Row, Spinner, Table, Toast, ToastContainer } from 'react-bootstrap';
import styles from './Users.module.css';
import HttpCallsService from '../../Services/http-calls';
import User from '../../Interfaces/User';
import DeleteUserConfirmationPopup from '../DeleteUserConfirmationPopup/DeleteUserConfirmationPopup';

const initialFormState: User = {
  id: '',
  firstName: '',
  lastName: '',
  gender: ''
};

function Users() {
  const [formData, setFormData] = useState<User>({
    firstName: '',
    lastName: '',
    gender: '',
    id: ''
  });
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addUpdateUserBtn, setAddUpdateUserBtn] = useState<'Add' | 'Update'>('Add');
  const [idToUpdateUser, setIdToUpdateUser] = useState<string>('');
  const [validated, setValidated] = useState(false);
  const [showWithBG, setShowWithBG] = useState<{
    show: boolean;
    bg: string;
    title: string;
    msg: string;
    userId?: string;
  }>({ show: true, bg: 'info', title: '', msg: '' });

  const [showConfirmationModal, setShowConfirmationModal] = useState<{
    show: boolean;
    userId?: any;
  }>({ show: false });

  const toggleShow = () => setShowWithBG({
    ...showWithBG,
    show: !showWithBG.show
  });

  // Fetch users
  const loadUsers = useCallback(() => {
    setIsLoading(true);
    HttpCallsService.getUsers()
      .then((response: any) => {
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        };
        return response.json();
      })
      .then((data: User[]) => {
        setUsers(data)
      })
      .catch(() => {
        setShowWithBG({
          show: true,
          bg: 'danger',
          title: 'Error',
          msg: 'Failed to load users'
        });
      })
      .finally(() => {
        setIsLoading(false)
      });
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = useCallback(() => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.gender !== ''
    );
  }, [formData]);

  const addUpdateUserAction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);
    if (!isFormValid()) {
      return;
    }

    setIsLoading(true);
    if (addUpdateUserBtn === 'Add') {
      addUser();
    } else {
      updateUser(idToUpdateUser);
    }
  };

  const addUser = () => {
    HttpCallsService.addUser(formData)
      .then(() => {
        clearForm();
        setShowWithBG({
          show: true,
          bg: 'light',
          title: 'Success',
          msg: 'User added successfully'
        });
      })
      .catch(() => {
        setShowWithBG({
          show: true,
          bg: 'danger',
          title: 'Error',
          msg: 'Error adding user'
        });
      })
      .finally(() => {
        setIsLoading(false)
        loadUsers();
      });
  };

  const updateUser = (id: string) => {
    HttpCallsService.updateUser(id, formData)
      .then(() => {
        setUsers(prev =>
          prev.map(user => (user.id === id ? { ...user, ...formData, id } : user))
        );
        clearForm();
        setAddUpdateUserBtn('Add');
        setIdToUpdateUser('');
        setShowWithBG({
          show: true,
          bg: 'light',
          title: 'Success',
          msg: 'is updated successfully',
          userId: id
        });
      })
      .catch(() => {
        setShowWithBG({
          show: true,
          bg: 'danger',
          title: 'Error',
          msg: 'Error updating user'
        });
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  const deleteUser = (id: string) => {
    setIsLoading(true);
    HttpCallsService.deleteUser(id)
      .then(() => {
        setUsers(prev => prev.filter(user => user.id !== id));
        setShowWithBG({
          show: true,
          bg: 'light',
          title: 'Success',
          msg: 'is deleted successfully',
          userId: id
        });
      })
      .catch(() => {
        setShowWithBG({
          show: true,
          bg: 'danger',
          title: 'Error',
          msg: 'Error deleting user'
        });
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  const onUpdateAction = (id: string, user: User) => {
    setAddUpdateUserBtn('Update');
    setIdToUpdateUser(id);
    setFormData({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
    });
  };

  const clearForm = () => {
    setFormData(initialFormState);
    setAddUpdateUserBtn('Add');
    setIdToUpdateUser('');
    setValidated(false);
  };

  const handleBtnClick = (action: string) => {
    if (action === 'Yes') {
      deleteUser(showConfirmationModal.userId);
    }
    setShowConfirmationModal({ show: false });
  };

  const handleTrimOnBlur = (field: keyof User) => {
    if (formData[field] && typeof formData[field] === 'string') {
      setFormData(prev => ({
        ...prev,
        [field]: (prev[field] as string).trim(),
      }));
    }
  };

  return (
    <div>
      {showWithBG.msg && <ToastContainer
        className="p-3" style={{ zIndex: 1 }} position={'top-end'}>
        <Toast show={showWithBG.show} onClose={toggleShow} delay={1000} autohide bg={showWithBG.bg}>
          <Toast.Header>
            <strong className="me-auto">{showWithBG.title}</strong>
          </Toast.Header>
          <Toast.Body>{showWithBG.userId && <b>User Id - {showWithBG.userId}</b>} {showWithBG.msg}</Toast.Body>
        </Toast>
      </ToastContainer>}
      <DeleteUserConfirmationPopup show={showConfirmationModal.show} onBtnClick={handleBtnClick}></DeleteUserConfirmationPopup>
      <Form noValidate validated={validated} onSubmit={addUpdateUserAction} className='m-3'>
        <Row className={styles.Users} data-testid='Users'>
          <Col md={3}></Col>
          <Col md={6}>
            <h4 className="modal-title pull-left mt-0">
              <u>{addUpdateUserBtn} User</u>
            </h4>
            <Form.Group controlId='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='First Name'
                value={formData.firstName}
                name='firstName'
                data-testid='firstName'
                required
                onChange={handleChange}
                onBlur={() => handleTrimOnBlur('firstName')}
              />
              <Form.Control.Feedback type='invalid'>
                First name is <strong>required</strong>
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Last Name'
                value={formData.lastName}
                name='lastName'
                data-testid='lastName'
                required
                onChange={handleChange}
                onBlur={() => handleTrimOnBlur('lastName')}
              />
              <Form.Control.Feedback type='invalid'>
                Last name is <strong>required</strong>
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='gender'>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={formData.gender}
                name='gender'
                data-testid='gender'
                required
                isInvalid={validated && formData.gender === ''}
                onChange={handleChange}
              >
                <option value=''>--Select--</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </Form.Select>
              <Form.Control.Feedback type='invalid'>
                Gender is <strong>required</strong>
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={3}></Col>
        </Row>

        <div className='modal-footer popup-footer mt-2'>
          <Col md={6}>
            <Row>
              <Col md={6}>
                <Button
                  type='button'
                  variant='secondary'
                  size='sm'
                  className={`${styles['f-right']} mx-2`}
                  onClick={clearForm}
                >
                  Reset
                </Button>
                <Button
                  type='submit'
                  variant='primary'
                  size='sm'
                  className={`${styles['f-right']}`}
                  disabled={!isFormValid()}
                >
                  {addUpdateUserBtn} User
                </Button>
              </Col>
            </Row>
          </Col>
        </div>
      </Form>

      <div className={`m-2 ${styles['overflow-div']}`}>
        {isLoading && (
          <div className='d-flex justify-content-center my-3'>
            <Spinner animation="border" role="status">
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </div>
        )}
        <Table className='table table-bordered'>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && !isLoading ? (
              <tr>
                <td colSpan={5} className="text-center">No users found.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>
                    <Button
                      type='button'
                      size='sm'
                      variant='outline-primary'
                      onClick={() => onUpdateAction(user.id, user)}
                    >
                      Update
                    </Button>
                    <Button
                      type='button'
                      size='sm'
                      variant='outline-danger'
                      className={`${styles['m-left']} mx-2`}
                      onClick={() => setShowConfirmationModal({
                        show: true,
                        userId: user.id
                      })}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Users;