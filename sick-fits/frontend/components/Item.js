import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Title from "./styles/Title";
import Itemstyles from "./styles/ItemStyles";
import DeleteItem from "./DeleteItem";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })
  };

  render() {
    const { item } = this.props;

    return (
      <Itemstyles>
        {/* this line here is going to check if there is an image and if there it will evaluate to true. if its false this line of code will never run. ⬇️ */}
        {item.image && <img src={item.image} alt={item.tilte} />}
        <Title>
          <Link
            href={{
              pathname: "./item",
              query: {
                id: item.id
              }
            }}
          >
            <a> {item.title} </a>
          </Link>
        </Title>
        <PriceTag> {formatMoney(item.price)} </PriceTag>
        <p> {item.description} </p>
        <div className="buttonList">
          <Link
            href={{
              pathname: "update",
              query: {
                id: item.id
              }
            }}
          >
            <a> Edit✏️ </a>
          </Link>
          <button> Add To Cart🛒 </button>
          <DeleteItem id={item.id}>Delete Item❌</DeleteItem>
        </div>
      </Itemstyles>
    );
  }
}
