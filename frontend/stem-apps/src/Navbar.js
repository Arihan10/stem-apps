import { Link } from "react-router-dom";

function NavItem(data) {
    return (
        <div className="p-4 py-2 text-white/60 hover:text-white/90 hover:font-semibold duration-200">
            <Link to={data.href}>
                {data.text}
            </Link>
        </div>
    );
}

function Navbar()
{
    const navItems = [
        {
            text: "Home",
            href: "/"
        },
        {
            text: "Resources",
            href: "/resources"
        },
        {
            text: "Help",
            href: "/help"
        }
    ]

    const NavItemsJSX = Object.entries(navItems).map(([index, res]) => {
        return (
            <NavItem key={index} text={res.text} href={res.href} />
        )
    });

  return (
    <div className="fixed w-full">
        <div className="z-20 bg-black sticky backdrop-blur-sm border-b-2 rounded-bl-xl rounded-br-xl border-white/10 top-0 w-full flex justify-center">
            <div className="flex flex-row gap-5 p-5 justify-center max-w-6xl grow">
                {NavItemsJSX}
            </div>
        </div>
    </div>
  );
}

export default Navbar;