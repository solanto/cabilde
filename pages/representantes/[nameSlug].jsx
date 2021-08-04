import Head from "next/head"
import Image from "next/image"
import renderName, { slugifyName } from "../../lib/render-name"
import slugify from "../../lib/slugify"
import styles from "../../styles/Perfil.module"
import MaterialIcon from "../../components/material-icon"
import TwitterTimeline from "../../components/twitter-timeline"
// import {
//     Resumen,
//     ViajesComisiones,
//     Actividades,
//     RedesSociales
// } from "../../components/perfil"
import { representantes } from "../../data/gov"

export async function getStaticPaths() {
    const paths = representantes.map(rep => {
        return {
            params: {
                nameSlug: slugifyName(rep.nombre)
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const props = {
        rep: representantes.find(rep => slugifyName(rep.nombre) == params.nameSlug)
    }

    props.quickActions = {
        "Correo": `mailto:${props.rep.contacto.correoElectronico}` || null,
        "Llamada": props.rep.contacto.telefono || null,
        "Sitio web": props.rep.contacto.sitioWeb || null
    }

    return { props }
}

const tableOfContents = [
    {
        title: "Perfil",
        current: true,
        icon: "person",
        // Section({ rep }) { return <Resumen {...{ rep, ...this }} /> }
    },
    {
        title: "Viajes y comisiones",
        anchor: "viajes-comisiones",
        icon: "near_me",
        // Section({ rep }) { return <ViajesComisiones {...{ rep, ...this }} /> }
    },
    {
        title: "Actividades",
        icon: "trending_up",
        // Section({ rep }) { return <Actividades {...{ rep, ...this }} /> }
    },
    {
        title: "Redes sociales",
        icon: "share",
        // Section({ rep }) { return <RedesSociales {...{ rep, ...this }} /> }
    },
    {
        title: "Lista de asistencia",
        anchor: "asistencia",
        icon: "inventory",
        // Section({ rep }) { }
    },
    {
        title: "Comisiones y comités",
        anchor: "comisiones-comites",
        icon: "work",
        // Section({ rep }) { }
    },
    {
        title: "Iniciativas",
        icon: "edit",
        // Section({ rep }) { }
    },
    {
        title: "Preguntas y respuestas",
        anchor: "preguntas-respuestas",
        icon: "forum",
        // Section({ rep }) { }
    }
]

const Perfil = ({ rep, quickActions }) =>
    <div className="grid-container">
        <Head>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
        </Head>

        <section id="rep-intro" className="grid-row">
            <Image className={styles["icono-perfil"] + " tablet:grid-col-3"}
                src="https://picsum.photos/200"
                alt=""
                width="200px"
                height="200px" />
            <div id="rep-intro-detalles" className="tablet:grid-col-fill contenido-derecha">
                <h1>Dip. {renderName(rep.nombre)}</h1>
                <ul className="usa-button-group usa-button-group--segmented">
                    {Object.entries(quickActions).map(([title, target], index) =>
                        <li key={index} className="usa-button-group__item">
                            <a href={target} className="usa-button usa-button--outline">{title}</a>
                        </li>
                    )}
                </ul>
            </div>
        </section>
        <div className="grid-row">
            <nav aria-label="Navegación de perfil," className="perfil-nav tablet:grid-col-3">
                <ul className="usa-sidenav">
                    {tableOfContents.map(({ title, anchor = slugify(title), icon, current = false }, index) =>
                        <li key={index} className="usa-sidenav__item">
                            <a href={`#${anchor}`} className={current ? "usa-current" : ""}>
                                <MaterialIcon {...{ icon }} />
                                <span>{title}</span>
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
            <section className="tablet:grid-col-fill contenido-derecha">
                
            </section>
            <TwitterTimeline handle={rep.contacto.twitter} displayName={renderName(rep.nombre)} />
        </div>
    </div>

export default Perfil
