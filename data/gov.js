import fetch from "sync-fetch"

// TODO: use github api
export const representantes = fetch("https://raw.githubusercontent.com/solanto/cabildummy-datos/master/diputados.json").json()
