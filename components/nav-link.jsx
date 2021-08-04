import Link from "./link"

/**
 * 
 * @augments Link
 * @param {object} props
 * @param {string} props.href
 * @param {function} [props.onMouseEnter]
 * @param {function} [props.onClick]
 * @param {import("react").ReactChild} [props.children]
 * @param {boolean} [props.isCurrent=false]
 */

const NavLink = ({ href, onMouseEnter, onClick, children, isCurrent = false, ...props }) =>
    <Link {...{ href, onClick, onMouseEnter }}
        className={isCurrent ? "usa-current" : ""}
        variant="nav"
        {...props}>
        {children}
    </Link>

export default NavLink
