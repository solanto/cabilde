import { Grid, GridContainer } from "@trussworks/react-uswds"
import FuzzySearch from "fuzzy-search"
import parsePhone from "libphonenumber-js"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Image from "next/image"
import DataTable from "../../components/data-table"
import Link from "../../components/link"
import Search from "../../components/search"
import Instrucciones from "../../content/representantes/instrucciones"
import { representantes } from "../../data/gov"
import Layout from "../../layouts/representantes"
import renderName, { renderNameNormalized, slugifyName } from "../../lib/render-name"
import selecting from "../../lib/selecting"
import Head from "next/head"


const tableReps = representantes.map(({
    nombre,
    contacto: { telefono },
    comisiones,
    partido,
    distrito
}) => {
    const phone = parsePhone(telefono, "MX")

    return {
        nombre: {
            verbatim: renderName(nombre),
            normalized: renderNameNormalized(nombre),
            slugified: slugifyName(nombre)
        },
        comisiones: comisiones.sort(),
        partido,
        distrito,
        telefono: {
            RFC3966: phone.format("RFC3966"),
            pretty: phone.formatNational()
        }
    }
})

const repSearch = new FuzzySearch(tableReps,
    [
        "nombre.verbatim",
        "nombre.normalized",
        "distrito",
        "partido",
        "comisiones",
        "telefono.pretty"
    ],
    {
        caseSensitive: false
    }
)

export async function getServerSideProps({ query: { busqueda: repQuery = "" } }) {
    return {
        props: {
            repQuery,
            repMatches: repSearch.search(repQuery)
        }
    }
}

function repLink(slug) {
    return `/representantes/${slug}/`
}

const Representantes = ({ repQuery, repMatches }) => {
    const router = useRouter()

    useEffect(
        () => document.getElementById("tabla"),
        [repMatches]
    )

    return (
        <Layout>
            <GridContainer>
                <Grid row>
                    <Grid tablet={{ col: 8 }}>
                        <Instrucciones />
                    </Grid>
                    <Grid tablet={{ col: 4 }}>
                        <Image
                            src="https://picsum.photos/seed/ine/200/100"
                            alt=""
                            width="200"
                            height="100"
                        />
                    </Grid>
                </Grid>
            </GridContainer>
            <Search
                defaultValue={repQuery}
                placeholder="Busca a tu representante"
            />
            <DataTable
                id="tabla"
                caption="This is a striped table"
                stackedStyle="headers"
                scrollable
                fullWidth
                data={repMatches}
                templateData={tableReps[0]}
                getEntry={({ nombre, seccion, distrito, partido, comisiones, telefono }) => (
                    {
                        // TODO: add photo, section
                        "Foto": <i>foto</i>,
                        "Nombre":
                            <Link href={repLink(nombre.slugified)}>
                                {nombre.verbatim}
                            </Link>,
                        "Sección eletoral": seccion,
                        "Distrito eletoral": distrito,
                        "Partido": partido,
                        "Comisiones": comisiones.join(", "),
                        "Teléfono":
                            <Link href={telefono.RFC3966}>
                                {telefono.pretty}
                            </Link>
                    }
                )}
                rowHeader="Nombre"
                getOnClick={({ nombre }) =>
                    () => !selecting(window) && router.push(repLink(nombre.slugified))
                }
                noDataMessage="Ningún representante correspondió a tu búsqueda."
            />
        </Layout>
    )
}

export default Representantes
