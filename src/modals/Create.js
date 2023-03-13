import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTaskPopup = ({ modal, toggle , setTaskList }) => {
    const [name, setName] = useState('');
    const [email , setEmail] = useState('')
    const [contact , setContact] = useState('')
    const [dob, setDob] = useState('');
    const [address , setAddress] = useState('')
  



    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            setName(value);
        } else if (name === "email")
        {
            setEmail(value);
        }else if(name === "contact"){
            setContact(value)
        }else if(name === "dob"){
            setDob(value)
        }else{
            setAddress(value);
        }
        
    };

    const handleSave =  (e) => {
        e.preventDefault();

        const taskObj = {
            Name: name,
            Email:email,
            Contact : contact,
            DOB: dob,
            Address: address
        };
        // await saveTask(taskObj);
    // toggle();
    const  postApi = async(taskObj) => {
            axios
            .post(`https://crudcrud.com/api/9d88f27eade34992a11c5f7820420adf/users`, taskObj) 
            .then((response) => {
              console.log(response.data)
              setTaskList( response.data);
            });
    }
        postApi(taskObj);
        toggle();
        
    
        
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create User</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" value={name} onChange={handleChange} name="name" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" value={email} onChange={handleChange} name="email" />
                </div>
                <div className="form-group">
                    <label>Contact</label>
                    <input type="tel" className="form-control" value={contact} onChange={handleChange} name="contact" />
                </div>
                <div className="form-group">
                    <label>DOB</label>
                    <input type="date" className="form-control" value={dob} onChange={handleChange} name="dob" />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <textarea name="address" id="" value={address} rows="5" className='form-control' onChange={handleChange}></textarea>
                </div>
              

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>Create</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>

        
    );
};

export default CreateTaskPopup;


