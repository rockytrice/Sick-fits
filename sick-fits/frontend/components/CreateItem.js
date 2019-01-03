import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import Form from "./styles/Form";
import FormatMoney from "../lib/formatMoney";

 class CreateItem extends Component {
  render() {
    return (
      <Form>
          <h2>Sell an Item.</h2>
      </Form>
    )
  }
}

export default CreateItem;