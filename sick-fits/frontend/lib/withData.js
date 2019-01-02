// this will give us an high order component that will expose our apollo client via a prop
import withApollo from 'next-with-apollo';

import ApolloClient from 'apollo-boost';

import { endpoint } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    // sort of like express middleware... when you make a request, if we have any logged cookies in the browser, the cookies will come along for the ride
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
