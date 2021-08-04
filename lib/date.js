export default function date(dateString) {
    const date = new Date(dateString)
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
}

const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
]

export function fullDate(dateString) {
    const date = new Date(dateString)
    return `el ${date.getUTCDate()} de ${months[date.getUTCMonth()]} de ${date.getUTCFullYear()}`
}
