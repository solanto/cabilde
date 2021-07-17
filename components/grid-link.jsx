import Link from "./link"
import { Grid } from "@trussworks/react-uswds"

const GridLink = ({ children, href }) =>
    <Link variant="unstyled" {...{ href }}>
        <Grid tablet={{ col: true }}>
            {children}
        </Grid>
    </Link>

export default GridLink
