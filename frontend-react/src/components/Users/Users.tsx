import React, { useEffect, useState, useCallback } from 'react';
import { Button, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import styles from './Users.module.css';
import HttpCallsService from '../../Services/http-calls';
import User from '../../Interfaces/User';

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
      .catch(error => {
        console.error('Error fetching users:', error)
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
        console.log('User added successfully!');
      })
      .catch(error => {
        console.error('Error adding user:', error)
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
        console.log('User updated successfully!');
      })
      .catch(error => {
        console.error('Error updating user:', error)
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
        console.log('User deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting user:', error)
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  const action = (id: string, user?: User) => {
    if (user) {
      setAddUpdateUserBtn('Update');
      setIdToUpdateUser(id);
      setFormData({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
      });
    } else {
      deleteUser(id);
    }
  };

  const clearForm = () => {
    setFormData(initialFormState);
    setAddUpdateUserBtn('Add');
    setIdToUpdateUser('');
    setValidated(false);
  };

  return (
    <div>
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
                <option value='Memale'>Female</option>
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

      <div className='m-2'>
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
                      onClick={() => action(user.id, user)}
                    >
                      Update
                    </Button>
                    <Button
                      type='button'
                      size='sm'
                      variant='outline-danger'
                      className={`${styles['m-left']} mx-2`}
                      onClick={() => action(user.id)}
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