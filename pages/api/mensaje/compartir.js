import { stringifyUrl } from "query-string"
import { compressToEncodedURIComponent as URICompress } from "lz-string"
import formResolve from "../../../lib/form-resolve"

const mensajePage = "/mensaje"

export function getSharingURL({ r: receptores, s: sujeto, m: mensaje, redirect = true }) {
    return {
        url: stringifyUrl({
            url: mensajePage,
            query: {
                r: receptores,
                s: URICompress(sujeto),
                m: URICompress(mensaje)
            }
        }),
        redirect
    }
}

export default function handler({ query }, resolve) {
    formResolve(getSharingURL(query), resolve)
}
