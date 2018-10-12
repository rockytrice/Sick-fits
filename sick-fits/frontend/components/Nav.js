import Link from "next/link";
const Nav = () => (
   <div>
       {/* This is client-side navigation; the action takes place in the browser, without making a request to the server. */}  
    <Link href="/">
        <a>Home</a>
    </Link> 
    <Link href="/Sell">
        <a>Sell</a>
    </Link> 
   </div> 
)

export default Nav;