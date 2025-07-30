import React, { useEffect, useState, useCallback } from 'react';
import { Button, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import styles from './Users.module.css';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
}

function Users() {
  const [formData, setFormData] = useState<User>({
    firstName: '',
    lastName: '',
    gender: '',
    id: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [addUpdateUserBtn, setAddUpdateUserBtn] = useState('Add');
  const [idToUpdateUser, setIdToUpdateUser] = useState<string>('');
  const [validated, setValidated] = useState(false);

  const loadUsers = useCallback(() => {
    setIsLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      setUsers([
        { id: '1', firstName: 'John', lastName: 'Doe', gender: 'male' },
        { id: '2', firstName: 'Jane', lastName: 'Bumhra', gender: 'male' },
        { id: '3', firstName: 'Alice', lastName: 'Smith', gender: 'female' },
      ]);
    }, 1000);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const action = (id: string, user?: User) => {
    if (user !== undefined) {
      setAddUpdateUserBtn('Update');
      setIdToUpdateUser(id);
      setFormData(user);
    } else {
      deleteUser(id);
    }
  };

  const isFormValid = useCallback(() => {
    return formData.firstName && formData.lastName && formData.gender !== '';
  }, [formData]);

  const addUpdateUserAction = (event: React.FormEvent<HTMLFormElement>, id?: string) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false || !isFormValid()) {
      setValidated(true);
      return;
    }

    setIsLoading(true);
    if (!id) {
      // Add User Logic
      addUser();
    } else {
      // Update User Logic
      updateUser(id);
    }
    clearForm();
    setValidated(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    addUpdateUserAction(event, addUpdateUserBtn === 'Update' ? idToUpdateUser : undefined);
  };


  const addUser = () => {
    console.log('Adding user:', formData);
    setTimeout(() => {
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...formData, id: String(prevUsers.length + 1 + Math.random().toFixed(0)) } // Generate a simple unique ID
      ]);
      setIsLoading(false);
      console.log('User added successfully!');
    }, 500);
  };

  const updateUser = (id: string) => {
    console.log('Updating user with id:', id, 'New data:', formData);
    setTimeout(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...formData, id: id } : user))
      );
      setIsLoading(false);
      setAddUpdateUserBtn('Add');
      setIdToUpdateUser('');
      console.log('User updated successfully!');
    }, 500);
  };

  const deleteUser = (id: string) => {
    console.log('Deleting user with id:', id);
    setIsLoading(true);
    setTimeout(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setIsLoading(false);
      console.log('User deleted successfully!');
    }, 500);
  };

  const clearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      gender: '',
      id: ''
    });
    setAddUpdateUserBtn('Add');
    setIdToUpdateUser('');
    setValidated(false);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className='m-3'>
        <Row className={styles.Users} data-testid='Users'>
          <Col md={3}></Col>
          <Col md={6}>
            <h4 className="modal-title pull-left mt-0"><u>{addUpdateUserBtn} User</u></h4>
            <Form.Group controlId='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control type='text' placeholder='First Name' value={formData.firstName} name='firstName'
                data-testid='firstName' required onChange={handleChange}
              />
              <Form.Control.Feedback type='invalid'>
                First name is <strong>required</strong>
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type='text' placeholder='Last Name' value={formData.lastName} name='lastName'
                data-testid='lastName' required onChange={handleChange}
              />
              <Form.Control.Feedback type='invalid'>
                Last name is <strong>required</strong>
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='gender'>
              <Form.Label>Gender</Form.Label>
              <Form.Select value={formData.gender} name='gender'
                data-testid='gender' required onChange={handleChange}
              >
                <option value=''>--Select--</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
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
                <Button type='button' variant='secondary' size='sm' className={`${styles['f-right']} mx-2`} onClick={clearForm}>
                  Reset
                </Button>
                <Button type='submit' variant='primary' size='sm' className={`${styles['f-right']}`} disabled={!isFormValid()}>
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
              users.map((user: User, index: number) => {
                return (
                  <tr key={user.id}>
                    <td>{index + 1}</td> {/* Use index for sequential numbering */}
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.gender}</td>
                    <td>
                      <Button type='button' size='sm' variant='outline-primary' onClick={() => action(user.id, user)}>Update</Button>
                      <Button type='button' size='sm' variant='outline-danger' className={`${styles['m-left']} mx-2`}
                        onClick={() => action(user.id)}> Delete</Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Users;
