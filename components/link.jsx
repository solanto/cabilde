import NextLink from "next/link"
import { Link as USWDSLink } from "@trussworks/react-uswds"
import isExternal from "../lib/is-external"

const Link = ({ href, children, variant, ...props }) =>
    <NextLink passHref {...{ href }}>
        <USWDSLink
            variant={variant || (isExternal(href) ? "external" : undefined)}
            {...props}
        >
            {children}
        </USWDSLink>
    </NextLink>

export default Link
