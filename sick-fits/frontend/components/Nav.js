import Link from "next/link";
import NavStyles from "./styles/NavStyles";



const Nav = () => (
   <NavStyles>
       {/* This is client-side navigation; the action takes place in the browser, without making a request to the server. */}  
        <Link href="/items">
        <a>Item</a>
        </Link>
        <Link href="/Sell">       
         <a>Sell</a>
        </Link>
        <Link href="/signup">
        <a>Signup</a>      
        </Link>
        <Link href="/orders">
        <a>Orders</a>
        </Link>
        <Link href="/me">
        <a>Account</a>
        </Link>

   </NavStyles> 
)

export default Nav;