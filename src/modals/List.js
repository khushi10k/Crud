import React, { useEffect, useState } from "react";
import PopupModal, { validationSchema } from "./PopupModal";
import { Table } from "reactstrap";
import "../App.css";
import axios from "axios";
import { ClapSpinner } from "react-spinners-kit";
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const List = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState();
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editRowId, setEditRowId] = useState(null);

  const [formData, setFormData] = useState({

    fname: "",
    lname:"" ,
    email: "",
    contact: "",
    address: "",
    errors: {},
  });

  // const handleNameClick = () => {
  //   setEditName(true); 
  // };

  // const handleNameKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     setEditName(false); 
  //   }
  // };

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`https://crudcrud.com/api/9a7ba88023a84ec08927c0c5d5d48aa3/users`)
        .then((response) => {
          //  console.log(response.data)
          setTaskList(response.data);
          setLoading(false);
          return;
        });
    };
    getData();
  }, []);

  // console.log(taskList,"get")

  const deleteApi = async (id) => {
    await axios
      .delete(
        `https://crudcrud.com/api/9a7ba88023a84ec08927c0c5d5d48aa3/users/${id}`
      )
      .then((response) => {
        //  console.log("data deleted")
        setTaskList(taskList.filter((user) => user._id !== id));
        toast.success('User deleted successfully'); 
        return;
      });
  };

  console.log('taskList', taskList)

  // const handleChange = (e) => {
  //   console.log("Handle CHange");
  //   let name = e.name;
  //   let value = e.value;
  //   setFormData((pre) => ({
  //     ...pre,
  //     [name]: value,
  //   }));
  // };

  // const handleChange = (e) => {
  //   let name = e.target.name;
  //   let val = e.target.value;
  //   setFormData({ ...formData, [name]: val })
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;

    Yup.reach(validationSchema, name)
      .validate(value)
      .then(() => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
          errors: {
            ...prevFormData.errors,
            [name]: undefined, 
          },
        }));
      })
      .catch((error) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
          errors: {
            ...prevFormData.errors,
            [name]: error.message, 
          },
        }));
      });
  };

  const postApi = async (taskObj) => {
    console.log('taskObj', taskObj)
    axios
      .post(
        `https://crudcrud.com/api/9a7ba88023a84ec08927c0c5d5d48aa3/users`,
        taskObj
      )
      .then((response) => {
        console.log("response.data  ::> ",response.data);
        setTaskList((prevList) => [...prevList, response.data]);
        setFormData({
          fname: "",
          lname: "",
          email: "",
          contact: "",
          address: "",
        });
      });
  };

  console.log('edit;', edit);
  console.log('editUser', editUser)
  const handleSubmit = async() => {
    setModal(false);
    
    if(edit){
      console.log('Inside Edit ----------------------')
      setFormData({
        fname: editUser.fname,
        lname: editUser.lname,
        email: editUser.email,
        contact: editUser.contact,
        address: editUser.address,
      });
      const userObj = {
              fname: formData.fname,
              lname: formData.lname,
              email: formData.email,
              contact: formData.contact,
              address: formData.address,
            };
      let response=await axios.put(`https://crudcrud.com/api/9a7ba88023a84ec08927c0c5d5d48aa3/users/${editUser._id}`, userObj);
      console.log('response', response)
      const updatedUser = { _id: editUser._id, ...userObj };
      setTaskList(taskList.map((user) => (user._id === editUser._id ? updatedUser : user)));
      setEdit(false);
      //toast.success('User updated successfully');
    }else{
      postApi(formData);
    } 
  };

  const toggle = () => {
    setModal(!modal);
    if (edit) { 
      setEdit(!edit);
    }
  };

  console.log('formData', formData)
  // const saveTask = (taskObj) => {
  //   const tempList = [...taskList, taskObj];
  //   // localStorage.setItem('taskList', JSON.stringify(tempList));
  //   console.log(tempList,"hgh")
  //   setTaskList(tempList);
  //   // setModal(false);
  // };

  const userColumns = ["Name", "Email", "Contact" , "Address", "Actions"];

  const TableRow = ({ user,setEdit,setModal ,setEditUser , editName}) => {
    const [name, setName] = useState(`${user.fname} ${user.lname}`);
    // console.log(user,"table")
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleNameKeyPress = (e) => {
      if (e.key === 'Enter') {
        // setEditName(false);
        setEditRowId(null);

        try {
          const updatedUser = {
            ...user,
            fname: name.split(' ')[0],
            lname: name.split(' ')[1],  
          };
    
         
          axios.put(
            `https://crudcrud.com/api/9a7ba88023a84ec08927c0c5d5d48aa3/users/${user._id}`,
            updatedUser,
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
    
          setTaskList((prevTaskList) =>
            prevTaskList.map((task) =>
              task._id === user._id ? updatedUser : task
            )
          );
        } catch (error) {
          console.error('Error updating user:', error);
        }
      }
    };

    return (
      <tr>
         {/* <td onClick={() =>{
          setEditName(true);
          console.log("clickedddd" , editName );
        }}>{user.fname}{' '}{user.lname}</td> */}
         {/* {editName ? ( */}
         {editRowId === user._id ? (
        <td>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onKeyPress={handleNameKeyPress}
          />
        </td>
      ) : (
        <td onClick={() => {
          setEditRowId(user._id)
          console.log('editRowId......', editRowId)
          console.log('user._id', user._id)
        }}>{name}</td>
      )}
        <td>{user.email}</td>
        <td>{user.contact}</td>
        <td>{user.address}</td>
        <td className="text-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setEditUser(user);
              setModal(true);
              setEdit(true);
            }}
          >
            Edit
          </button>{" "}
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              deleteApi(user._id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

  return (
    <>
    <ToastContainer />
      <div className="header text-center">
        <h3>Create User</h3>
        <button className="create-task-button" onClick={() => setModal(true)}>
          Add User
        </button>
      </div>
      {loading ? (
        <div className="spinner-container">
          <ClapSpinner size={60} color="#007bff" loading={loading} />
        </div>
      ) : (
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
              <TableRow key={user._id} user={user} setEdit={setEdit} setModal={setModal} setEditUser={setEditUser} editName={editName}  editRowId={editRowId}/>
            ))}
          </tbody>
        </Table>
      )}
      <PopupModal
        handleSubmit={handleSubmit}
        modal={modal}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        toggle={toggle}
        setModal={setModal}
        edit={edit}
        setEdit={setEdit}
        editUser={editUser}
        setEditUser={setEditUser}

      />
    </>
  );
};

export default List;


