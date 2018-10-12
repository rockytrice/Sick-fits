import Link from "next/link";
import NavStyles from "./styles/NavStyles";



const Nav = () => (
   <NavStyles>
       {/* This is client-side navigation; the action takes place in the browser, without making a request to the server. */}  
    <Link href="/">
        <a>Home</a>
    </Link> 
    <Link href="/Sell">
        <a>Sell</a>
    </Link> 
   </NavStyles> 
)

export default Nav;