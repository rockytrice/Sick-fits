import React from "react";
import PaginationStyles from "./styles/PaginationStyles";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { perPage } from "../config";
import Head from "next/head";
import Link from "next/link";

// pagination query
const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    #   query name
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>loading...</p>;
      const count = data.itemsConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      const page = props.page;
      return (
        <PaginationStyles>
          <Head>
            {/* updating the title bar */}
            <title>
              Sick Kicks - Page {page} of {pages}
            </title>
          </Head>
          {/* in production the prefetch pre renders the previous and forward looking page */}
          <Link
            prefetch
            href={{
              pathname: "items",
              query: { page: page - 1 }
            }}
          >
            {/* disables the prev link on the first page */}
            <a className="Prev" aria-disabled={page <= 1}>
              ⬅️ Prev
            </a>
          </Link>
          <p>
            Page {props.page} of {pages}
          </p>
          <Link
            prefetch
            href={{
              pathname: "items",
              query: { page: page + 1 }
            }}
          >
            {/* disables the next link on the last page */}
            <a className="Next" aria-disabled={page >= pages}>
              Next ➡️
            </a>
          </Link>
          <p>{count} items total</p>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
