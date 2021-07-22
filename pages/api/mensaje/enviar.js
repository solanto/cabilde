import mailtoLink from "mailto-link"
import { slugifyName } from "../../../lib/render-name"
import ensureArray from "../../../lib/ensure-array"
import formResolve from "../../../lib/form-resolve"

import { representantes } from "../../../data/gov"

function getMailtoLink({ r: unsafeReceptores, s: sujeto, m: mensaje, redirect = true }) {
    const receptores = ensureArray(unsafeReceptores)

    return {
        url: mailtoLink({
            to: receptores.map(slug =>
                representantes.find(rep =>
                    slugifyName(rep.nombre) == slug
                ).contacto.correoElectronico
            ),
            subject: sujeto,
            body: mensaje
        }),
        redirect
    }
}

export default async function handler({ query }, resolve) {
    formResolve(getMailtoLink(query), resolve)
}
