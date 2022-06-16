import React from "react";
import "./navbar.css"



function Navbar() {
    return (
        <>
            <div className="navbar">
               <ul>
               <li><a href="/">Home</a></li>
               <li><a href="/companys/">Add new site +</a></li>            
               <li><a href="/rsim/">Resiliency calculator</a></li>
               <li><a href="/solarcalculator/">Solar calculator</a></li>
               
               </ul>
            <div className="navbar-side">
                <li ><a className="authstyle" href="/login">Login</a></li>
                <li ><a className="authstyle2" href="/signup">Signup</a></li>
                {/* <button className="myprofile">My profile</button> */}
            </div>
            </div>
        </>
    );
}

export default Navbar 