import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form } from 'reactstrap';
import axios from 'axios';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  fname: Yup.string().required('First name is required'),
  lname: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  contact: Yup.string().required('Contact is required'),
  address: Yup.string().required('Address is required'),
});




// const Edit = ({ modal, toggle,  setTaskList, taskList , editUser , setEditUser,setEdit,edit}) => {
//   console.log('editUser', editUser)
// //   const [name, setName] = useState(editUser ? editUser.Name : '');
// // const [email, setEmail] = useState(editUser ? editUser.Email : '');
// // const [contact, setContact] = useState(editUser ? editUser.Contact : '');
// // const [dob, setDob] = useState(editUser ? editUser.DOB : '');
// // const [address, setAddress] = useState(editUser ? editUser.Address : '');

// console.log('edit', edit)
// // const [formData,setFormData]=useState({
// //   name:"",
// //   email:"",
// //   contact:"",
// //   dob:"",
// //   address:""
// // });



// // const handleChange=(e)=>{
// //   let name=e.target.name;
// //   let value=e.target.value;
// //   setFormData((pre)=>({
// //     ...pre,
// //     [name]:value,
// //   }));
// // }
// // useEffect(()=>{
// //   if(edit){
// //     console.log("inside");
// //     setFormData({
// //       name:editUser.Name,
// //       email:editUser.Email,
// //       contact:editUser.Contact,
// //       dob:editUser.DOB,
// //       address:editUser.Address
// //     })
// //   }
// //   else{
// //     setFormData({
// //       name:"",
// //       email:"",
// //       contact:"",
// //       dob:"",
// //       address:""
// //     })
// //   }
// // },[])

// const updateUser=()=>{
  
// }



//   // const handleNameChange = e => {
//   //   setName(e.target.value);
//   // };

//   // const handleEmailChange = e => {
//   //   setEmail(e.target.value);
//   // };

//   // const handleContactChange = e => {
//   //   setContact(e.target.value);
//   // };

//   // const handleDobChange = e => {
//   //   setDob(e.target.value);
//   // };

//   // const handleAddressChange = e => {
//   //   setAddress(e.target.value);
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
  
//   //   const userObj = {
//   //     Name: formData.name,
//   //     Email: formData.email,
//   //     Contact: formData.contact,
//   //     DOB: formData.dob,
//   //     Address: formData.address,
//   //   };
  
//   //   if (editUser) {
//   //     await axios.put(`https://crudcrud.com/api/0f20ff4baf124ebba61782581ee0f55c/users/${editUser._id}`, userObj);
//   //     const updatedUser = { _id: editUser._id, ...userObj };
//   //     setTaskList(taskList.map((user) => (user._id === editUser._id ? updatedUser : user)));
//   //     setEditUser(null);
//   //   } else {
//   //     await axios.post('https://crudcrud.com/api/0f20ff4baf124ebba61782581ee0f55c/users', userObj);
//   //     setTaskList([...taskList, userObj]);
//   //   }
  
//   //   setFormData({
//   //     name:"",
//   //     email:"",
//   //     contact:"",
//   //     dob:"",
//   //     address:""
//   //   })

//   //   setEdit(false);
  
//   //   toggle();
//   // };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
  
//   //   const userObj = {
//   //     Name: name,
//   //     Email: email,
//   //     Contact: contact,
//   //     DOB: dob,
//   //     Address: address,
//   //   };
  
//   //   if (editUser) {
//   //     await axios.put(`https://crudcrud.com/api/0f20ff4baf124ebba61782581ee0f55c/users/${editUser._id}`, userObj);
//   //     const updatedUser = { _id: editUser._id, ...userObj };
//   //     setTaskList(taskList.map((user) => (user._id === editUser._id ? updatedUser : user)));
//   //     setEditUser(null);
//   //   } else {
//   //     await axios.post('https://crudcrud.com/api/0f20ff4baf124ebba61782581ee0f55c/users', userObj);
//   //     setTaskList([...taskList, userObj]);
//   //   }
  
//   //   setName('');
//   //   setEmail('');
//   //   setContact('');
//   //   setDob('');
//   //   setAddress('');
  
//   //   toggle();
//   // };
const PopupModal = ({ handleSubmit ,modal,formData,setFormData, handleChange,toggle,setModal , edit, setEdit,editUser, setEditUser}) => {
  const modalTitle = edit ? 'Edit User' : 'Add User';
  const okText = edit ? 'Update' : 'Add';

  const [editName, setEditName] = useState(false);

  const handleNameClick = () => {
    setEditName(true); // Enable inline name editing
  };

  const handleNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      setEditName(false); // Disable inline name editing on Enter key press
    }
  };

  useEffect(() => {
    // Update form data with existing values when in edit mode
    if (edit && editUser) {
      setFormData({
        fname: editUser.fname,
        lname: editUser.lname,
        email: editUser.email,
        contact: editUser.contact,
        address: editUser.address,
        errors: {},
      });
    } else {
      // Reset form data when in add mode
      setFormData({
        fname: '',
        lname: '',
        email: '',
        contact: '',
        address: '', 
        errors: {},
      });
    }
  }, [edit, editUser]);

  const handleValidation = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      handleSubmit();
    } catch (error) {
      const errors = {};
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setFormData((prevFormData) => ({
        ...prevFormData,
        errors: errors,
      }));
    }
  };


  return (
    <Modal isOpen={modal} toggle={toggle} >
      <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
      <ModalBody>
      <Form>
        <FormGroup >
          <Label for="fname">FirstName</Label>
          {/* {editName ? (
              <Input type="text" name="fname" id="" value={formData.fname} onChange={handleChange} onKeyPress={handleNameKeyPress} />
            ) : (
          // <Input type="text" name="fname" id="" value={formData.fname} onChange={handleChange} onClick={handleNameClick} />
          <span onClick={() => {handleNameClick()}}>{formData.fname}</span>
            )} */}
           <Input type="text" name="fname" id="" value={formData.fname} onChange={handleChange} />
           {formData.errors && <div className="error">{formData.errors.fname}</div>}
        </FormGroup>
        <FormGroup >
          <Label for="lname">LastName</Label>
          <Input type="text" name="lname" id="" value={formData.lname} onChange={handleChange} />
          {formData.errors && <div className="error">{formData.errors.lname}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="" value={formData.email} onChange={handleChange} />
          {formData.errors && <div className="error">{formData.errors.email}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="contact">Contact</Label>
          <Input type="text" name="contact" id="" value={formData.contact} onChange={handleChange} />
          {formData.errors && <div className="error">{formData.errors.contact}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="textarea" name="address" id="" value={formData.address} onChange={handleChange} />
          {formData.errors && <div className="error">{formData.errors.address}</div>}
        </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleValidation}>
        {okText}
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PopupModal;

// edit the code such that add the validations using yup when feilds are empty while adding the user
