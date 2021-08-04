import { toRoman } from "roman-numerals"

export default function renderExpediente({ documento, congreso }) {
    return `${documento}/${toRoman(congreso)}`
}

export function labelExpediente({ documento, congreso }) {
    return `documento ${documento} del congreso ${congreso}`
}

export function slugifyExpediente({ documento, congreso }) {
    return `${documento}-${toRoman(congreso)}`.toLowerCase()
}
