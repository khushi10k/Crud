//import logo from './logo.svg';
// import './App.css';
// import CreateUser from './Components/CreateUser';
// //import EditUser from './Components/EditUser';
// // import UsersList from './Components/UserListing';

// function App() {
//   return (
//     <>
//       <CreateUser buttonLabel="Create User"/> 
      
//     </>
//   );
// }

// export default App;


import React, { useState } from 'react';
import CreateUserModal from './Components/CreateUser';
import { Table } from 'reactstrap';

const App = () => {
  const [users, setUsers] = useState([]);

  const handleCreateUser = (user) => {
    setUsers([...users, user]);
  };

  const handleDeleteUser = (index) => {
    setUsers(users.filter((user, i) => i !== index));
  };

  const handleEditUser = (index, name) => {
    const updatedUsers = [...users];
    updatedUsers[index] = { ...updatedUsers[index], name };
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>Create a User</h1>
      <CreateUserModal buttonLabel="Create User" onCreateUser={handleCreateUser} />
      <h1>List of Users</h1>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>
                <button onClick={() => handleEditUser(index, prompt('Enter new name:'))}>Edit</button>
                <button onClick={() => handleDeleteUser(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default App;



