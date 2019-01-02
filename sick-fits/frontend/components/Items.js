import React, { Component } from 'react'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

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

const Center = styled.div`
  text-align:center;
`;
const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap:60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;



// the way that we use the query above is something called a rendered prop.

 class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
        {/* the only child of a query component is going to  be a function. this will give you either loading state, error or the actual list of items it self.  */}

        {/* destructurng the values out of payload that i wanted into variables  */}
            {({ data, error, loading })=> {
              console.log(data);
              if(loading){
                return <p>Loading...</p>
              }
              if(error){
                return <p>Error: {error.message}</p>
              }
              return <ItemsList>
                {data.items.map( item=> <p>{item.title}</p>)}
            </ItemsList>
          }}
        </Query>
      </Center>
    )
  }
}

export default Items;