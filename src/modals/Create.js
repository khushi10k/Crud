import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import '../App.css';




const CreateTaskPopup = ({ modal, toggle, setTaskList , taskList}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});



  const validateForm = () => {
    let errors = {};
    let isValid = true;

    
    if (!name) {
      errors["name"] = "Please enter your name";
      isValid = false;
    }


    if (!email) {
      errors["email"] = "Please enter your email address";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors["email"] = "Please enter a valid email address";
      isValid = false;
    }
    else if (taskList.findIndex(task => task.Email === email) !== -1) {
        errors["email"] = "Email already exists";
        isValid = false;
      }

    if (!contact || isNaN(contact) || contact.length !== 10) {
      errors["contact"] = "Please enter a valid 10 digit mobile number";
      isValid = false;
    }

    if(!dob) {
        errors["dob"] = "Please select your DOB";
        isValid = false;
    }
    if(!address) {
        errors["address"] = "Please enter address";
        isValid = false;
    }


    setErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
        
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "contact") {
      setContact(value);
    } else if (name === "dob") {
      setDob(value);
    } else {
      setAddress(value);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const taskObj = {
        Name: name,
        Email: email,
        Contact: contact,
        DOB: dob,
        Address: address,
      };

      const postApi = async (taskObj) => {
       
        axios
          .post(
            `https://crudcrud.com/api/420ca2feb4cf4b7ab394f502a107e751/users`,
            taskObj
          )
          .then((response) => {
            // console.log(response.data);
            setTaskList((prevList) => [...prevList, response.data]);
            
          });
      };
      postApi(taskObj);
      toggle();
    }
  };

  return (
    
      
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create User</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Name</label><label className="red">*</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange}
            name="name"
          />
          {errors["name"] && (
            <div className="text-danger">{errors["name"]}</div>
          )}
        </div>
        <div className="form-group">
          <label>Email</label><label className="red">*</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={handleChange}
            name="email"
          />
          {errors["email"] && (
            <div className="text-danger">{errors["email"]}</div>
          )}
        </div>
        <div className="form-group">
          <label>Contact</label><label className="red">*</label>
          <input
            type="tel"
            className="form-control"
            value={contact}
            onChange={handleChange}
            
            name="contact"
          />
          {errors["contact"] && (
            <div className="text-danger">{errors["contact"]}</div>
          )}
        </div>
        

        <div className="form-group">
          <label>DOB</label>
          <input
            type="date"
            className="form-control"
            value={dob}
            onChange={handleChange}
            name="dob"
          />
          {errors["dob"] && (
            <div className="text-danger">{errors["dob"]}</div>
          )}
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            id=""
            value={address}
            rows="3"
            className="form-control"
            onChange={handleChange}
          ></textarea>
          {errors["address"] && (
            <div className="text-danger">{errors["address"]}</div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Create
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>


  );
};

export default CreateTaskPopup;

