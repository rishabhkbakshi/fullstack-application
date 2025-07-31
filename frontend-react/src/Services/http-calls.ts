import User from "../Interfaces/User";

const apiUrl: string = 'http://localhost:8080/'

// get => select operation 
const getUsers = async () => {
    return await fetch(`${apiUrl}users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

// post => insert operation 
const addUser = async (user: any) => {
    return await fetch(`${apiUrl}users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
}

// put => update operation 
const updateUser = async (id: any, user: User) => {
    await fetch(`${apiUrl}users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
}

// delete => delete operation 
const deleteUser = async (id: any) => {
    await fetch(`${apiUrl}users/${id}`, {
        method: 'DELETE',
    });
}

let HttpCallsService = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
};

export default HttpCallsService;