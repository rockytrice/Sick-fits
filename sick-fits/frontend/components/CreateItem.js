import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Form from "./styles/Form";
import FormatMoney from "../lib/formatMoney";
import gql from "graphql-tag";
import Error from "./ErrorMessage";

// query thats going to submit the data. so this is sort of like a function that is going to take in these variables and when it is called its going to run createItem which we specified in our schema on the back in and use the passed in variables that we noted with the $. Once it has been created all we want back is the Item's id.
const CREATE_ITEM_MUTATUION = gql`
  mutation CREATE_ITEM_MUTATUION(
    $title: String!
    $price: Int!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    CreateItem(
      title: $title
      price: $price
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0
  };
  //  fuction so we can access 'this' so we can update the state inside of the form and actually type inside of the input fields
  handleChange = e => {
    //  making it so that this fuction can be reused for all of the inputs on this page ⬇️..
    const { name, type, value } = e.target;
    //  if this is a number we need to make sure its a proper number because any text that comes out of an input, even if its a type of number it will still out it as a string so we need to coerce it to a proper number
    const val = type === "number" ? parseFloat(value) : value;
    //  console.log({name, type, value});
    //  modified the setState to work for any input using computed property names and it will mirror that change to state
    this.setState({ [name]: val });
  };
  render() {
    return (
      //    exposing the create_item_mutation function.. wrap the entire form tag in a mutation component. so when this mutatuion fires, its going to take a copy of this.state and send all of those values for the ride.
      <Mutation mutation={CREATE_ITEM_MUTATUION} variables={this.state}>
        {/* just like query, the only child of a mutation or a query can be an actul function. Instead of taking a payload, it gives us the mutationfunction(createItem) and the payload. then we return everything from below ⬇️ 😰 */}
        {(CreateItem, { loading, error }) => (
          <Form
            onSubmit={e => {
              // listening for the submit event and pushing it up to the server.
              e.preventDefault();
              console.log(this.state);
            }}
          >
            <Error error={error} />
            {/* 👍 adding the loading will stop the user from being able to edit or submit the form again. so if the loading is true then the user will not be able to edit the form. the aria-busy will tell the user if the group of fields is busy or not.Apollo will flip this on and off automatically 😃*/}
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter a description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATUION };
