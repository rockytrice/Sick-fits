import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

// this is where we get access to the item it self. all we know is the  db's id and we need to pull that from the db in order to populate the item so the user can see what they are editing
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

// query thats going to submit the data. so this is sort of like a function that is going to take in these variables and when it is called its going to run createItem which we specified in our schema on the back in and use the passed in variables that we noted with the $. Once it has been created all we want back is the Item's id.

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {};
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
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {/* take the data that was returned from our single item query and put them into the input boxes but not tie it to state directly but show the user what they have and then if they change anything then put it into state!!😎   */}
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          return (
            //    exposing the UPDATE_ITEM_MUTATION function.. wrap the entire form tag in a mutation component. so when this mutatuion fires, its going to take a copy of this.state and send all of those values for the ride.
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {/* just like query, the only child of a mutation or a query can be an actul function. Instead of taking a payload, it gives us the mutationfunction(createItem) and the payload. then we return everything from below ⬇ 😰 */}
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => this.updateItem(e, updateItem)}>
                  <Error error={error} />
                  {/* 👍 adding the loading will stop the user from being able to edit or submit the form again. so if the loading is true then the user will not be able to edit the form. the aria-busy will tell the user if the group of fields is busy or not.Apollo will flip this on and off automatically 😃*/}

                  {/* by changing value to defaultValue in react it allows you to set some input box to some text without tying it to state because we are going to be mirroring it to state only when they change it.   */}
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={data.item.title}
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
                        defaultValue={data.item.price}
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
                        defaultValue={data.item.description}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">Save Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
