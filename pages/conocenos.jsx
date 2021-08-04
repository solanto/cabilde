import { Grid, GridContainer } from "@trussworks/react-uswds"
import Image from "next/image"
import ProfilePhoto from "../components/profile-photo"
import styles from "../styles/conocenos.module"

import Intro from "../content/conocenos/intro"

import Valeria, { frontMatter as valeriaFM } from "../content/conocenos/valeria"
import Kristen, { frontMatter as kristenFM } from "../content/conocenos/kristen"
import Andrew, { frontMatter as andrewFM } from "../content/conocenos/andrew"

const profiles = [
    {
        Biography: Valeria,
        frontMatter: valeriaFM
    },
    {
        Biography: Kristen,
        frontMatter: kristenFM
    },
    {
        Biography: Andrew,
        frontMatter: andrewFM
    }
]

const Conocenos = () =>
    <>
        <article className="usa-section usa-section--light">
            <GridContainer>
                <Grid row>
                    <Grid asCustom="section">
                        <Intro />
                    </Grid>
                </Grid>
            </GridContainer>
        </article>
        <GridContainer asCustom="article">
            {profiles.map(({ Biography, frontMatter: { foto } }, index) =>
                <Grid
                    row
                    gap="4"
                    asCustom="section"
                    className={`usa-section ${styles["profile"]}`}
                    key={index}
                >
                    <Grid tablet={{ col: 3 }} className={styles["profile__photo-container"]}>
                        <ProfilePhoto
                            src={foto}
                            width="200"
                            height="200"
                        />
                    </Grid>
                    <Grid tablet={{ col: 9 }} className={styles["profile__biography-container"]}>
                        <Biography />
                    </Grid>
                </Grid>
            )}
        </GridContainer>
    </>

export default Conocenos
