import Items from "../components/Items";

const Home = props => (
  <div>
    {/* pagination was showing up as string so parsed it. also it will fall back to 1 if its on the first page.👍🏾 */}
    <Items page={parseFloat(props.query.page) || 1} />
  </div>
);

export default Home;
