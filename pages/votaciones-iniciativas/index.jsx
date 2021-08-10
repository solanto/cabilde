import Head from "next/head"
import { Table } from "@trussworks/react-uswds"
import TableRow from "../../components/table-row"
import Link from "../../components/link"
import { iniciativas } from "../../data/gov"
import date, { fullDate } from "../../lib/date"
import renderExpediente, { slugifyExpediente, labelExpediente } from "../../lib/render-expediente"
import { toStyleKey, voteCounts, votePercents, votingStatus } from "../../lib/votes"
import VoteStat from "../../components/vote-stat"
import Search from "../../components/search"
import DataTable from "../../components/data-table"
import FuzzySearch from "fuzzy-search"
import { normalizeSync as normalize } from "normalize-diacritics"
import { useRouter } from "next/router"
import selecting from "../../lib/selecting"

const InicStatus = ({ statusFlag, percentAFavor }) => {
    if (["aprobada", "rechazada"].includes(statusFlag)) {
        return (
            <VoteStat styleKey={toStyleKey(statusFlag)}>
                {percentAFavor}%
            </VoteStat>
        )

    } else {
        return <VoteStat asCustom="span">pendiente</VoteStat>
    }
}

const tableInics = iniciativas.map(({
    asunto,
    expediente,
    fecha,
    votacion,
    mayoriaEspecial
}) => {
    return {
        asunto: {
            verbatim: asunto,
            normalized: normalize(asunto)
        },
        expediente: {
            short: renderExpediente(expediente),
            long: labelExpediente(expediente),
            slugified: slugifyExpediente(expediente)
        },
        fecha: {
            iniciada: {
                short: date(fecha.iniciada),
                long: fullDate(fecha.iniciada)
            },
            radicada: {
                short: date(fecha.radicada),
                long: fullDate(fecha.radicada)
            }
        },
        statusFlag: votingStatus(votacion, mayoriaEspecial),
        percentAFavor: votePercents(voteCounts(votacion)).aFavor
    }
})

// TODO: support granular search
const inicSearch = new FuzzySearch(tableInics,
    [
        "asunto.verbatim",
        "asunto.normalized",
        "expediente.rendered.short",
        "expediente.rendered.long",
        "fecha.iniciada.short",
        "fecha.iniciada.long",
        "fecha.radicada.short",
        "fecha.radicada.long",
        "statusFlag"
    ],
    {
        caseSensitive: false
    }
)

export async function getServerSideProps({ query: { busqueda: inicQuery = "" } }) {
    return {
        props: {
            inicQuery,
            inicMatches: inicSearch.search(inicQuery)
        }
    }
}

function inicLink(slug) {
    return `/votaciones-iniciativas/${slug}`
}

const VotacionesIniciativas = ({ inicQuery, inicMatches }) => {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Representantes | Cabilde</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Search
                placeholder="Busca una iniciativa"
                defaultValue={inicQuery}
            />
            <DataTable
                caption="yee"
                stackedStyle="headers"
                scrollable
                fullWidth
                data={inicMatches}
                templateData={tableInics[0]}
                getEntry={({ asunto, expediente, fecha, statusFlag, percentAFavor }) => (
                    {
                        "Asunto":
                            <Link href={inicLink(expediente.slugified)}>
                                {asunto.verbatim}
                            </Link>,
                        "Expediente":
                            <span aria-label={expediente.long}>
                                {expediente.short}
                            </span>,
                        "Fecha iniciada":
                            <span aria-label={fecha.iniciada.long}>
                                {fecha.iniciada.short}
                            </span>,
                        "Fecha radicada":
                            <span aria-label={fecha.radicada.long}>
                                {fecha.radicada.short}
                            </span>,
                        "Votación a favor": <InicStatus {...{ statusFlag, percentAFavor }} />
                    }
                )}
                rowHeader="Asunto"
                getOnClick={({ expediente }) =>
                    () => !selecting(window) && router.push(inicLink(expediente.slugified))
                }
                noDataMessage="Ningún representante correspondió a tu búsqueda."
            />
        </div>
    )
}


export default VotacionesIniciativas
