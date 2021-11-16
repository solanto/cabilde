import { iniciativas, representantes } from "../../data/gov"
import renderExpediente, { labelExpediente, slugifyExpediente } from "../../lib/render-expediente"
import { byRep, parseMajorityProportion, renderVotacionKey, toStyleKey, voteCounts, votePercents, voteRatios, votingStatus } from "../../lib/votes"
import { GridContainer, Grid, Table } from "@trussworks/react-uswds"
import Link from "../../components/link"
import LinkButton from "../../components/link-button"
import { Line } from "rc-progress"
import statStyles from "../../styles/vote-stat.module"
import VoteStat from "../../components/vote-stat"
import TableRow from "../../components/table-row"
import renderName, { slugifyName } from "../../lib/render-name"
import sameNames from "../../lib/same-names"
import DataTable from "../../components/data-table"
import selecting from "../../lib/selecting"
import { useRouter } from "next/router"
import styles from "../../styles/Votaciones-Iniciativas.module"
import Icon from "../../components/material-icon"


export function getStaticPaths() {
    return {
        paths: iniciativas.map(({ expediente }) => (
            {
                params: {
                    expedienteSlug: slugifyExpediente(expediente)
                }
            }
        )),
        fallback: false
    }
}

function inicData({
    expediente,
    votacion,
    mayoriaEspecial,
    asunto,
    fecha
}) {
    return {
        expediente,
        repVotes: byRep(votacion).map(({ nombre, votacionKey }) => {
            const { partido, representacion, distrito, municipio } =
                representantes.find(({ nombre: candidate }) => sameNames(nombre, candidate))
                || {}

            return {
                nombre: renderName(nombre),
                link: `/representantes/${slugifyName(nombre)}`,
                votacionKey,
                partido,
                representacion,
                distrito,
                municipio
            }
        }),
        asunto
    }
}

export function getStaticProps({ params: { expedienteSlug } }) {
    const {
        expediente,
        votacion,
        mayoriaEspecial,
        asunto,
        fecha
    } = iniciativas.find(
        ({ expediente: candidate }) => slugifyExpediente(candidate) == expedienteSlug
    )

    return {
        props: {
            expediente,
            asunto,
            votacion,
            repVotes: byRep(votacion)
                .map(({ nombre, votacionKey }) => (
                    {
                        nombre,
                        votacionKey,
                        ...representantes.find(({ nombre: candidate }) => sameNames(nombre, candidate))
                    }
                ))
                .map(({
                    nombre,
                    votacionKey,
                    partido,
                    representacion,
                    distrito,
                    municipio
                }) => (
                    {
                        nombre: renderName(nombre),
                        link: `/representantes/${slugifyName(nombre)}`,
                        votacionKey,
                        partido: partido || null,
                        representacion: representacion || null,
                        distrito: distrito || null,
                        municipio: municipio || null
                    }
                ))
        }
    }
}

const VoteStats = ({ votacion }) => {
    const votes = voteCounts(votacion)
    const statusFlag = votingStatus(votes)
    let status, bar, details

    const Detail = ({ title, children }) =>
        <li>{title}: {children}</li>

    if (["aprobada", "rechazada"].includes(statusFlag)) {
        const percents = votePercents(votes)
        const repsTotal = Object.values(votes).reduce((count, total) => count + total)
        const repsPresent = repsTotal - votes.ausente

        status = <VoteStat styleKey={toStyleKey(statusFlag)}>{statusFlag}</VoteStat>

        bar = <Line
            aria-hidden="true"
            percent={percents.aFavor}
            strokeLinecap="square"
            strokeColor={statStyles["barra__a-favor"]}
            trailColor={statStyles["barra__en-contra"]}
            class={styles["barra-votacion"]}
        />

        const PresentDetail = ({ title, statKey, styleKey }) =>
            <li>{title}: <VoteStat {...{ styleKey }}>{percents[statKey]}%</VoteStat> ({votes[statKey]}/{repsPresent} presente)</li>

        details = <>
            <PresentDetail
                title="A favor"
                statKey="aFavor"
                styleKey="a-favor"
            />
            <PresentDetail
                title="En contra"
                statKey="enContra"
                styleKey="en-contra"
            />
            <PresentDetail
                title="Abstenido"
                statKey="abstenido"
            />
            <Detail title="Ausente">{votes.ausente}/{repsTotal} total</Detail>
        </>
    } else {
        bar = details = <></>
        status = <VoteStat>{statusFlag}</VoteStat>
    }

    return (
        <div>
            {bar}
            {/* TODO: add hidden label for screen readers like in @solanto/portfolio */}
            <ul>
                <Detail title="Estado">{status}</Detail>
                {details}
            </ul>
        </div>
    )
}

const Iniciativa = (
    {
        expediente,
        votacion,
        mayoriaEspecial,
        asunto,
        fecha,
        repVotes,
        representacion
    }
) => {
    const router = useRouter()

    return (
        <article>
            <GridContainer>
                <Grid row>
                    <Grid tablet={{ col: true }}>
                        <hgroup>
                            <h1>{asunto}</h1>
                            <h2 aria-label={`Expediente: ${labelExpediente(expediente)}`}>
                                Expediente {renderExpediente(expediente)}
                            </h2>
                        </hgroup>
                    </Grid>
                    <Grid tablet={{ col: true }}>
                        <LinkButton href="#">Descarga esta iniciativa</LinkButton>
                        {/* TODO: add link field in schema */}
                    </Grid>
                </Grid>
            </GridContainer>
            <VoteStats {...{ votacion }} />
            <section className={styles["rep-votes"]}>
                <DataTable
                    caption="Cómo votaron los representantes:"
                    stackedStyle="headers"
                    scrollable
                    fullWidth
                    data={repVotes}
                    getEntry={
                        (
                            {
                                nombre,
                                link,
                                partido,
                                representacion,
                                distrito,
                                municipio,
                                votacionKey
                            }
                        ) => (
                            {
                                "Foto": <Icon icon="account_circle"/>,
                                "Nombre": <Link href={link}>{nombre}</Link>,
                                "Partido": partido,
                                "Representación": representacion,
                                "Distrito eletoral": distrito,
                                "Municipio": municipio,
                                "Votacíon":
                                    <VoteStat styleKey={toStyleKey(votacionKey)}>
                                        {renderVotacionKey(votacionKey)}
                                    </VoteStat>
                            }
                        )
                    }
                    getOnClick={({ link }) =>
                        () => !selecting(window) && router.push(link)
                    }
                    noDataMessage="Aún ninguna votación se ha registrado."
                />
            </section>
        </article>
    )
}

export default Iniciativa
