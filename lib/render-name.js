import slugify from "./slugify"

export function renderName({ nombre, apellidos }) {
    return nombre + " " + apellidos
}

export function slugifyName(name) {
    return slugify(renderName(name))
}
