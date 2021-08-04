import slugify from "./slugify"
import { normalizeSync as normalize } from "normalize-diacritics"

export default function renderName({ nombre, apellidos }) {
    return nombre + " " + apellidos
}

export function renderNameNormalized(name) {
    return normalize(renderName(name))
}

export function slugifyName(name) {
    return slugify(renderName(name))
}
