import React, { useEffect, useState } from 'react';
import CreateTaskPopup from './Create';
import { Table } from 'reactstrap';
import '../App.css';

const List = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const arr = localStorage.getItem('taskList');

    if (arr) {
      const obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    const tempList = [...taskList, taskObj];
    localStorage.setItem('taskList', JSON.stringify(tempList));
    setTaskList(tempList);
    setModal(false);
  };

  const userColumns = ['Name', 'Email', 'Contact', 'DOB' , 'Address' , 'Actions'];

  const TableRow = ({ user , deleteItem , updateItem }) => {
    return (
      <tr>
        <td>{user.Name}</td>
        <td>{user.Email}</td>
        <td>{user.Contact}</td>
        <td>{user.DOB}</td>
        <td>{user.Address}</td>
        <td className='text-end'>

<button type="button" className="btn ms-auto"   ><i className="fa-solid fa-trash edit-icon"></i></button>
<button type="button" className="btn" >
    <i className="fa-solid fa-pen edit-icon"></i>
</button>
</td>
      </tr>
    );
  };

  return (
    <>
      <div className="header text-center">
        <h3>Create User</h3>
        <button className="create-task-button" onClick={() => setModal(true)}>
          Add User
        </button>
      </div>
      <Table>
        <thead>
          <tr>
            {userColumns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {taskList.map((user) => (
            <TableRow key={user.Email} user={user} />
          ))}
        </tbody>
      </Table>
      <CreateTaskPopup toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default List;

