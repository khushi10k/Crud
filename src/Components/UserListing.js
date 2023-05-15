import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

const UserList = ({ users, deleteUser, updateUser }) => {
  const [editableEmail, setEditableEmail] = useState("");
  const [editedName, setEditedName] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleEdit = (email, name) => {
    setEditableEmail(email);
    setEditedName(name);
    toggle();
  };

  const handleSave = () => {
    const updatedUsers = users.map((user) =>
      user.email === editableEmail ? { ...user, name: editedName } : user
    );
    updateUser(updatedUsers);
    setEditableEmail("");
    setEditedName("");
    toggle();
  };

  const handleCancel = () => {
    setEditableEmail("");
    setEditedName("");
    toggle();
  };

  return (
    <div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>
                {editableEmail === user.email ? (
                  <Input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>
                <Button
                  color="primary"
                  onClick={() => handleEdit(user.email, user.name)}
                  disabled={editableEmail !== ""}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button color="danger" onClick={() => deleteUser(user.email)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit User</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserList;
