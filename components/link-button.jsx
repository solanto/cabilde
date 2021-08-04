import Link from "./link"

const LinkButton = ({ className, size, children, ...props }) =>
    <Link className={`usa-button ${size == "big" ? "usa-button--big" : ""} ${className}`}
        variant="unstyled"
        {...props}>
        {children}
    </Link>

export default LinkButton
