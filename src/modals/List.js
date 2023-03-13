import React, { useEffect, useState } from 'react';
import CreateTaskPopup from './Create';
import { Table } from 'reactstrap';
import '../App.css';
import axios from 'axios';

const List = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  

  useEffect(() => {
  const getData = async() => {
  
      await axios.get(`https://crudcrud.com/api/9d88f27eade34992a11c5f7820420adf/users`)
       .then((response)=>{
         console.log(response.data)
        setTaskList(response.data)
        
         return 
       })
     }
     getData();
     } , []);

    console.log(taskList,"get")

    const deleteApi = async(id) => {
  
      await axios.delete(`https://crudcrud.com/api/9d88f27eade34992a11c5f7820420adf/users/${id}`)
       .then((response)=>{
         console.log("data deleted")
         setTaskList(taskList.filter((user)=> user._id !== id))
         return 
       })
       
     }
    
 
  // useEffect(() => {
    
  //   console.log(arr,"h")
    
    
  // }, []);

  const toggle = () => {
    setModal(!modal);
  };

  // const saveTask = (taskObj) => {
  //   const tempList = [...taskList, taskObj];
  //   // localStorage.setItem('taskList', JSON.stringify(tempList));
  //   console.log(tempList,"hgh")
  //   setTaskList(tempList);
  //   // setModal(false);
  // };

  const userColumns = ['Name', 'Email', 'Contact', 'DOB' , 'Address' , 'Actions'];

  const TableRow = ({ user}) => {
    console.log(user,"table")
    return (
      <tr>
        <td>{user.Name}</td>
        <td>{user.Email}</td>
        <td>{user.Contact}</td>
        <td>{user.DOB}</td>
        <td>{user.Address}</td>
        <td className='text-end'>

        <button type="button" class="btn btn-primary" >Edit</button>{' '}
        <button type="button" class="btn btn-danger" onClick={() => {deleteApi(user._id)}}>Delete</button>

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
            // console.log({user})
            <TableRow key={user._id} user={user} />
          ))}
        </tbody>
      </Table>
      <CreateTaskPopup toggle={toggle} modal={modal}   />
    </>
  );
};

export default List;

