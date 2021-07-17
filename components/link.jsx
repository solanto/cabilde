import NextLink from "next/link"
import { Link as USWDSLink } from "@trussworks/react-uswds"

const Link = ({ href, children, ...props }) =>
    <NextLink {...{ href }} passHref>
        <USWDSLink {...props}>{children}</USWDSLink>
    </NextLink>

export default Link
