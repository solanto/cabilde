import fetch from "sync-fetch"
import renderName from "../lib/render-name"

// TODO: use github api
export const
    representantes = fetch("https://raw.githubusercontent.com/solanto/cabildummy-datos/master/diputados.json")
        .json()
        .sort(({ nombre }) => renderName(nombre)),
    iniciativas = fetch("https://raw.githubusercontent.com/solanto/cabildummy-datos/master/iniciativas.json")
        .json()
        .sort(({ fecha: { iniciada } }) => new Date(iniciada))
        .reverse()
