import React, { useState } from 'react';

const UserTable = ({ users, deleteUser, editUser }) => {
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '', dob: '' });

  const handleEdit = (user) => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, email: user.email, dob: user.dob });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    editUser(currentUser.id, currentUser);
    setEditing(false);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.dob}</td>
            <td>
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
      {editing && (
        <tfoot>
          <tr>
            <td>
              <input type="text" name="name" value={currentUser.name} onChange={(event) => setCurrentUser({ ...currentUser, name: event.target.value })} />
            </td>
            <td>
              <input type="email" name="email" value={currentUser.email} onChange={(event) => setCurrentUser({ ...currentUser, email: event.target.value })} />
            </td>
            <td>
              <input type="date" name="dob" value={currentUser.dob} onChange={(event) => setCurrentUser({ ...currentUser, dob: event.target.value })} />
            </td>
            <td>
              <button onClick={handleUpdate}>Update</button>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};

export default UserTable;
