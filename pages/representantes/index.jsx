import Head from "next/head"
// import Image from "next/image"
import styles from "../../styles/Home.module.scss"
import Script from 'next/script'
import { Table, Search, TextInput, ButtonGroup, Button } from "@trussworks/react-uswds"
import TableRow from "../../components/table-row"
import Link from "../../components/link"
import { renderName, slugifyName } from "../../lib/render-name"
import parsePhone from "libphonenumber-js"
import data from "../../data/governmental-data"
import { useRouter } from 'next/router'

export async function getStaticProps() {
    return {
        props: {
            representantes: await data.get("representantes")
        }
    }
}

const Representantes = ({ representantes }) => {
    const router = useRouter()
    const { search: query } = router.query

    const searchPlaceholder = "Busca tu representante"

    return (
        <div>
            <Head>
                <title>Representantes | Cabilde</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Search size="big"
                placeholder={query || searchPlaceholder}
                label="Buscar"
                i18n={{
                    buttonText: "Buscar",

                }}/>
            <Table caption={"This is a striped table"}
                stackedStyle="headers"
                scrollable
                fullWidth>
                <thead>
                    <TableRow head-section items={[
                        { body: "Nombre" },
                        { body: "Distrito" },
                        { body: "Partido" },
                        { body: "Comisiones" },
                        { body: "Teléfono" }
                    ]} />
                </thead>
                <tbody>
                    {representantes
                        .filter(rep => query == undefined
                            || RegExp(query, "i").test(JSON.stringify(rep))
                        )
                        // TODO: better search function
                        .map((rep, index) => {
                            const telefono = parsePhone(rep.contacto.telefono, "MX")

                            return (
                                <TableRow key={index} items={[
                                    {
                                        body: (
                                            <Link href={`/representantes/${slugifyName(rep.nombre)}/`}>
                                                {renderName(rep.nombre)}
                                            </Link>
                                        ),
                                        sort: renderName(rep.nombre)
                                    },
                                    { body: rep.distrito },
                                    { body: rep.partido },
                                    { body: rep.comisiones.sort().join(", ") },
                                    (telefono
                                        ? {
                                            body: (
                                                <Link href={telefono.format("RFC3966")}>
                                                    {telefono.formatNational()}
                                                </Link>
                                            ),
                                            sort: telefono.format("RFC3966")
                                        }
                                        : {
                                            body: "–",
                                            "aria-label": "teléfono indisponsible"
                                        }
                                    )
                                ]} />
                            )
                        })
                    }
                </tbody>
            </Table>

            <Script>
                {`
                    (() => {
                        const params = new URLSearchParams(window.location.search)
                        const searchbar = document.getElementById("search-field")

                        if (params.has("search")) {
                            searchbar.setAttribute("value", params.get("search"))
                            searchbar.setAttribute("placeholder", "${searchPlaceholder}")
                        }
                    })()
                `}
            </Script>
        </div>
    )
}

export default Representantes
