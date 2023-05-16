import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form } from 'reactstrap';
import axios from 'axios';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const validationSchema = Yup.object({
  fname: Yup.string().required('First name is required'),
  lname: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  contact: Yup.string()
    .min(10, 'Phone number must have at least 10 digits')
    .max(10, 'Phone number must have at least 10 digits')
    .required('Contact is required'),
  address: Yup.string().required('Address is required'),
});


const PopupModal = ({ handleSubmit ,modal,formData,setFormData, handleChange,toggle,setModal , edit, setEdit,editUser, setEditUser}) => {
  const modalTitle = edit ? 'Edit User' : 'Add User';
  const okText = edit ? 'Update' : 'Add';


  

  useEffect(() => {
   
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
      //toast.success('User added successfully');
      //alert('User added successfully');
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
    <>
    <ToastContainer />
    <Modal isOpen={modal} toggle={toggle} >
      <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
      <ModalBody>
      <Form>
        <FormGroup >
          <Label for="fname">FirstName</Label>
           {/* {editName ? (
              <Input type="text" name="fname" id="" value={formData.fname} onChange={handleChange} onKeyPress={handleNameKeyPress} />
            ) : (
          <Input type="text" name="fname" id="" value={formData.fname} onChange={handleChange} onClick={() => {
            handleNameClick()
          //   console.log('clickedddddddd' , editName)
            
           } } />
          // <span onClick={() => {
          //   handleNameClick()
          //   console.log('clickedddddddd' , editName)
          // }}>{formData.fname}</span>
            )}  */}
           <Input type="text" name="fname" id="" value={formData.fname} onChange={handleChange}  />
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
          <Input type="number" name="contact" id="" value={formData.contact} onChange={handleChange} 
          //maxLength={10} works only when text
          />
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
    </>
  );
};

export default PopupModal;

// edit this code such that when click on name the usestate of editname is set to true and give condition that if the editname usestate is true then the name value will be shown in input feild for inline edit 