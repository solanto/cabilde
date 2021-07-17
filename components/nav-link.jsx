import Link from "./link"

const NavLink = ({ href, onMouseEnter, onClick, children, isCurrent = false, ...props }) =>
    <Link {...{ href, onClick, onMouseEnter }}
        className={isCurrent ? "usa-current" : ""}
        variant="nav"
        {...props}>
        {children}
    </Link>

export default NavLink
