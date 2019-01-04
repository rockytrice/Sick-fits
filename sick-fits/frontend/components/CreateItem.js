import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import Form from "./styles/Form";
import FormatMoney from "../lib/formatMoney";

 class CreateItem extends Component {
     state= {
         title: "",
         description: "",
         image: "",
         largeImage: "",
         price: 0,
     };
    //  fuction so we can access 'this' so we can update the state inside of the form and actually type inside of the input fields
     handleChange = (e) => {
        //  making it so that this fuction can be reused for all of the inputs on this page ⬇️..
         const{name, type, value } = e.target;
        //  if this is a number we need to make sure its a proper number because any text that comes out of an input, even if its a type of number it will still out it as a string so we need to coerce it to a proper number
         const val= type === "number" ? parseFloat(value) :
         value;
        //  console.log({name, type, value});
        //  modified the setState to work for any input using computed property names and it will mirror that change to state
       this.setState({[name]: val});         
     }
  render() {
    return (
        // listening for the submit event and pushing it up to the server.
      <Form onSubmit ={(e) => {
          e.preventDefault();
          console.log(this.state);
      }} >
        <fieldset>
          <label htmlFor="title">
              Title 
              <input type="text" id="title" name="title"
              placeholder="Title" required 
              value = {this.state.title}
              onChange={this.handleChange}
              />
              
          </label>
          <label htmlFor="price">
              Price 
              <input type="number" id="price" name="price"
              placeholder="Price" required 
              value = {this.state.price}
              onChange={this.handleChange}
              />
              
          </label>
          <label htmlFor="description">
              Description
              <textarea  id="description" name="description"
              placeholder="Enter a description" required 
              value = {this.state.description}
              onChange={this.handleChange}
              />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </Form>
    )
  }
}

export default CreateItem;