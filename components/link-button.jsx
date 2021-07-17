import Link from "./link"

const LinkButton = ({ className, size, href, children }) =>
    <Link className={`usa-button ${size == "big" ? "usa-button--big" : ""} ${className}`}
        variant="unstyled"
        {...{ href }}>
        {children}
    </Link>

export default LinkButton
