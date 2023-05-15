import React, { useEffect, useState } from "react";
import CreateTaskPopup from "./Create";
import PopupModal from "./PopupModal";
import { Table } from "reactstrap";
import "../App.css";
import axios from "axios";
import { ClapSpinner } from "react-spinners-kit";

const List = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState();
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname:"" ,
    email: "",
    contact: "",
    address: "",
    errors: {},
  });

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`https://crudcrud.com/api/57170e32613f4f6f86f0b858a406af4d/users`)
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
        `https://crudcrud.com/api/57170e32613f4f6f86f0b858a406af4d/users/${id}`
      )
      .then((response) => {
        //  console.log("data deleted")
        setTaskList(taskList.filter((user) => user._id !== id));
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

  const handleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    setFormData({ ...formData, [name]: val })
  }

  const postApi = async (taskObj) => {
    console.log('taskObj', taskObj)
    axios
      .post(
        `https://crudcrud.com/api/57170e32613f4f6f86f0b858a406af4d/users`,
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
      let response=await axios.put(`https://crudcrud.com/api/57170e32613f4f6f86f0b858a406af4d/users/${editUser._id}`, userObj);
      console.log('response', response)
      const updatedUser = { _id: editUser._id, ...userObj };
      setTaskList(taskList.map((user) => (user._id === editUser._id ? updatedUser : user)));
      setEdit(false);
    }else{
      postApi(formData);
    }
  };

  const toggle = () => {
    setModal(!modal);
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

  const TableRow = ({ user,setEdit,setModal ,setEditUser}) => {
    // console.log(user,"table")
    return (
      <tr>
        <td>{user.fname}{' '}{user.lname}</td>
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
              <TableRow key={user._id} user={user} setEdit={setEdit} setModal={setModal} setEditUser={setEditUser} />
            ))}
          </tbody>
        </Table>
      )}
      {/* <CreateTaskPopup toggle={toggle} modal={modal} setTaskList={setTaskList}  taskList={taskList}   /> */}
      {/* <EditTaskPopup1 toggle={toggle} modal={modal} setTaskList={setTaskList}  taskList={taskList} editUser={editUser}  setEditUser={setEditUser} edit={edit} setEdit={setEdit}/> */}
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

//edit the code such that add the validations using Formik

