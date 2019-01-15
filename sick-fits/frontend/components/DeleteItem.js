import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  // this seems to not work🤔
  //   update = (cache, payload) => {
  //     // steps to manually update the cache on the client so it matches the server.
  //     // first we read the cache for what items we want. This query below ⬇️ give's us access to all items on the page.
  //     const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
  //     console.log(data);
  //     // secondly, filter the deleted items out of the page.
  //     data.items = data.items.filter(
  //       item => item.id !== payload.data.deleteItem.id
  //     );
  //     // lastly, we will put the items back❗️
  //     cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  //   };
  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this item")) {
                deleteItem();
              }
              console.log("Item Deleted 👍🏾");
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}
export default DeleteItem;
