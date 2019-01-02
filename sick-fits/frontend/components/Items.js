import React, { Component } from 'react'
import { Query } from "react-apollo";
import gql from "graphql-tag";

// best practice to put all of your queries in caps. Works exactly like styled components as so we write our queries in a string and you tag in using "gql" inside of back tics!!
const ALL_ITEMS_QUERY = gql `
query ALL_ITEMS_QUERY {
    items {
        id
        title
        price
        description
        image
        largeImage
    }
}
`;

// the way that we use the query above is something called a rendered prop.

 class Items extends Component {
  render() {
    return (
      <div>
        <p>
           Items! 
        </p>
        <Query query={ALL_ITEMS_QUERY}>
        {/* the only child of a query component is going to  be a function. this will give you either loading state, error or the actual list of items it self.  */}
          {(payload)=> {
              console.log(payload);
              return <p>Hey i'm the child of query</p>
          }}
        </Query>
      </div>
    )
  }
}

export default Items;
