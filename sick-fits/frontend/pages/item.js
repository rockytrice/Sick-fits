import SingleItem from "../components/SingleItem";

const Item = props => (
  <div>
    {/* accessing the item's id */}
    <SingleItem id={props.query.id} />
  </div>
);

export default Item;
