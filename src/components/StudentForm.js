import {React, useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './style.css';

import eventBus from '../components/eventBus';

const StudentForm = () => {
  const[nameClass,setnameClass] = useState("default");
  const[classClass,setclassClass] = useState("default");
  const[contactClass,setcontactClass] = useState("default");

 function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    if(!(validateClass(data.get('class')) && validateName(data.get('name')) && validateContact(data.get('contact')))){
      alert("Invalid Data. Please provide right info.")
      return;
    }

    var studentNew = {
      "StudentId": Math.ceil(Math.random()*1000),
      "Name": data.get('name'),
      "Class": data.get('class'),
      "Contact_Number": data.get('contact'),
      "Gender": data.get('gender'),
      "DOB": data.get('dob')
    }
    eventBus.dispatch('addStudent',studentNew);

 }

 function onNameChangeListener(event) {
   var name = event.target.value;
   var styleClass = validateName(name)?'default':'invalid';
   setnameClass(styleClass);
   
 }

 function onClassChangeListener(event) {
  var name = event.target.value;
  var styleClass = validateClass(name)?'default':'invalid';
  setclassClass(styleClass);
  
  
}

function onContactChangeListener(event) {
  var name = event.target.value;
  var styleClass = validateContact(name)?'default':'invalid';
  setcontactClass(styleClass);
  
}


 function validateName(data) {
  const regex = new RegExp('^[a-zA-Z ]+$');
  return regex.test(data);
 }

 function validateClass(data) {
  const regex = new RegExp('^[0-9]{1,2}$');
  return regex.test(data);
}

function validateContact(data) {
  const regex = new RegExp('^[0-9]{10}$');
  return regex.test(data);
}

    return ( <>
        <Form onSubmit={handleSubmit}>
        <FormGroup>
        <legend>Name</legend>
          <Input type="text" name="name" id="name" className={nameClass} onChange={onNameChangeListener}/>
        </FormGroup>
        <FormGroup>
        <legend>Class</legend>
          <Input type="text" name="class" id="class" className={classClass} onChange={onClassChangeListener}/>
        </FormGroup>
        <FormGroup>
        <legend>Contact</legend>
          <Input type="text" name="contact" id="contact" className={contactClass} onChange={onContactChangeListener}/>
        </FormGroup>
        <FormGroup>
          <legend>Gender</legend>
          <Label check for="male">
          <Input type="radio" name="gender" id="male" value="M"/>Male</Label><br/>
          <Label check for="female">
          <Input type="radio" name="gender" id="male" value="F"/>Female </Label>
          
        </FormGroup>
        <FormGroup>
        <legend>Date of Birth</legend>
          <Input type="date" name="dob" id="dob"/>
        </FormGroup>
        <Button type="submit">Add</Button>
      </Form>
      
      </>
    );
}


export default StudentForm
