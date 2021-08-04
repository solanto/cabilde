import Link from "./link"
import { Grid } from "@trussworks/react-uswds"

/**
 * 
 * @param {object} props
 * @param {string} props.href
 * @param {import("react").ReactChild} [props.children]
 */

const GridLink = ({ children, href }) =>
    <Link variant="unstyled" {...{ href }}>
        <Grid tablet={{ col: true }}>
            {children}
        </Grid>
    </Link>

export default GridLink
