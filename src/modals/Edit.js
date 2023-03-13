// import React, { useState , useEffect} from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// const EditTaskPopup = ({modal, toggle, updateTask, taskObj}) => {
//   const [name, setName] = useState('');
//   const [email , setEmail] = useState('')
//   const [contact , setContact] = useState('')
//   const [dob, setDob] = useState('');
//   const [address , setAddress] = useState('')

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "name") {
//         setName(value);
//     } else if (name === "email")
//     {
//         setEmail(value);
//     }else if(name === "contact"){
//         setContact(value)
//     }else if(name === "dob"){
//         setDob(value)
//     }else{
//         setAddress(value);
//     }
    
// };

//     useEffect(() => {
//         setName(taskObj.name)
//         setEmail(taskObj.email)
//         setContact(taskObj.contact)
//         setDob(taskObj.dob)
//         setAddress(taskObj.address)

//     },[])

//     const handleUpdate = (e) => {
//         e.preventDefault();
//         let tempObj = {}
//         tempObj['Name'] = name
//         tempObj['Email'] = email
//         tempObj['Contact'] = contact
//         tempObj['DOB'] = dob
//         tempObj['Address'] = address

//         updateTask(tempObj)
//         toggle()
//     }

//     return (
//       <Modal isOpen={modal} toggle={toggle}>
//       <ModalHeader toggle={toggle}>Update user</ModalHeader>
//       <ModalBody>
//           <div className="form-group">
//               <label>Name</label>
//               <input type="text" className="form-control" value={name} onChange={handleChange} name="name" />
//           </div>
//           <div className="form-group">
//               <label>Email</label>
//               <input type="text" className="form-control" value={email} onChange={handleChange} name="email" />
//           </div>
//           <div className="form-group">
//               <label>Contact</label>
//               <input type="tel" className="form-control" value={contact} onChange={handleChange} name="contact" />
//           </div>
//           <div className="form-group">
//               <label>DOB</label>
//               <input type="date" className="form-control" value={dob} onChange={handleChange} name="dob" />
//           </div>
//           <div className="form-group">
//               <label>Address</label>
//               <textarea name="address" id="" value={address} rows="5" className='form-control' onChange={handleChange}></textarea>
//           </div>
        

//       </ModalBody>
//             <ModalFooter>
//                 <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
//                 <Button color="secondary" onClick={toggle}>Cancel</Button>
//             </ModalFooter>
//         </Modal>
//     );
// };

// export default EditTaskPopup;
