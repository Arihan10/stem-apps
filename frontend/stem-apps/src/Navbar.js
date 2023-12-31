import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from ".";

function NavItem(data) {
    return (
        <div className="p-4 py-2 text-white/60 hover:text-white/90 hover:font-semibold duration-200 text-xs md:text-base">
            <Link to={data.href}>
                {data.text}
            </Link>
        </div>
    );
}

function Navbar()
{
    const context = useContext(UserContext); 
    let filtered = {}; 


    const navItems = [
        {
            text: "Home",
            href: ""
        },
        {
            auth: true,
            text: "User",
            href: "info"
        },
        {
            auth: true,
            text: "Dashboard",
            href: "dash"
        },
        {
            auth: false,
            text: "Sign in",
            href: "auth"
        },
        {
            auth: false,
            text: "Sign up",
            href: "signup"
        },
        {
            auth: true,
            text: "View Applications",
            href: "apps"
        }
    ]
        filtered = navItems.filter(e => {
            return (("auth" in e) === false) || ((e.auth === true) === (context.user != null))
        }); 

    const NavItemsJSX = Object.entries(filtered).map(([index, res]) => {
        return (
            <NavItem key={index} text={res.text} href={res.href} />
        )
    });

  return (
    <div className="z-20 bg-zinc-950/90 sticky backdrop-blur-sm border-b-2 rounded-bl-xl rounded-br-xl border-white/10 top-0 w-full flex justify-center">
        <div className="flex flex-row gap-5 p-5 justify-center max-w-6xl grow">
            {NavItemsJSX}
        </div>
    </div>
  );
}

export default Navbar;