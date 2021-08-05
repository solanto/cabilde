import { iniciativas, representantes } from "../../data/gov"
import renderExpediente, { labelExpediente, slugifyExpediente } from "../../lib/render-expediente"
import { byRep, parseMajorityProportion, renderVotacionKey, toStyleKey, voteCounts, votePercents, voteRatios, votingStatus } from "../../lib/votes"
import { GridContainer, Grid, Table } from "@trussworks/react-uswds"
import Link from "../../components/link"
import LinkButton from "../../components/link-button"
import { Line } from "rc-progress"
import styles from "../../styles/vote-stat.module"
import VoteStat from "../../components/vote-stat"
import TableRow from "../../components/table-row"
import renderName, { slugifyName } from "../../lib/render-name"
import sameNames from "../../lib/same-names"


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

export function getStaticProps({ params: { expedienteSlug } }) {
    return {
        props: {
            inic: iniciativas.find(({ expediente }) => slugifyExpediente(expediente) == expedienteSlug)
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
            strokeColor={styles["barra__a-favor"]}
            trailColor={styles["barra__en-contra"]}
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

const Iniciativa = ({ inic: { expediente, votacion, mayoriaEspecial, asunto, fecha } }) => {
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
            <Table
                caption={"This is a striped table"}
                stackedStyle="headers"
                scrollable
                fullWidth
            >
                <thead>
                    {/* TODO: make nombre header, not foto (edit TableRow; maybe abstract interface) */}
                    <TableRow head-section items={[
                        { body: "Foto" },
                        { body: "Nombre" },
                        { body: "Partido" },
                        { body: "Representación" },
                        { body: "Distrito eletoral" },
                        { body: "Municipio" },
                        { body: "Votación" }
                    ]} />
                </thead>
                <tbody>
                    {byRep(votacion).map(({ nombre, votacionKey }, index) => {
                        const { partido, representacion, distrito, municipio } =
                            representantes.find(({ nombre: candidate }) => sameNames(nombre, candidate))
                            || {}

                        return (
                            <TableRow key={index} items={[
                                { body: <i>foto</i> },
                                {
                                    body:
                                        <Link href={`/representantes/${slugifyName(nombre)}`}>
                                            {renderName(nombre)}
                                        </Link>
                                },
                                { body: partido },
                                { body: representacion },
                                { body: distrito },
                                { body: municipio },
                                {
                                    body:
                                        <VoteStat styleKey={toStyleKey(votacionKey)}>
                                            {renderVotacionKey(votacionKey)}
                                        </VoteStat>
                                }
                            ]} />
                        )
                    })}
                </tbody>
            </Table>
        </article>
    )
}

export default Iniciativa
