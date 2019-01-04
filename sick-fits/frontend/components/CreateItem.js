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
         console.log({name, type, value});
       this.setState({title: e.target.value});         
     }
  render() {
    return (
      <Form>
        <fieldset>
          <label htmlFor="title">
              Title 
              <input type="text" id="title" name="title"
              placeholder="Title" required 
              value = {this.state.title}
              onChange={this.handleChange}
              />
              
          </label>
        </fieldset>
      </Form>
    )
  }
}

export default CreateItem;