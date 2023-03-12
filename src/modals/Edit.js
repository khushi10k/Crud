import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Edit = ({ user, index, update, remove }) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState(user.Name);
  const [email, setEmail] = useState(user.Email);
  const [dob, setDob] = useState(user.DOB);

  const toggle = () => setModal(!modal);

  const handleUpdate = () => {
    const updatedUser = { Name: name, Email: email, DOB: dob };
    update(index, updatedUser);
    toggle();
  };

  const handleDelete = () => {
    remove(index);
    toggle();
  };

  return (
    <>
      <td>{user.Name}</td>
      <td>{user.Email}</td>
      <td>{user.DOB}</td>
      <td>
        <Button color="primary" onClick={toggle}>
          Edit
        </Button>
        <Button color="danger" onClick={handleDelete}>
          Delete
        </Button>
      </td>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit User</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>DOB</label>
            <input
              type="date"
              className="form-control"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Edit;
