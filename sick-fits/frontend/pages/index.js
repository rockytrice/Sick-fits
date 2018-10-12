// This is the Link API
import Link from "next/link";


const Home = props => (
    <div>
    <p>Home</p>
    {/* This is client-side navigation; the action takes place in the browser, without making a request to the server. */}
    <Link href="/Sell">
        <a>Sell</a>
    </Link>    
    </div>
);

export default Home;