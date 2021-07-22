import AsyncCache from "async-cache-promise"

const dataCache = new AsyncCache({
    async load(key) {
        if (key in dataSources) {
            return await dataSources[key]()
        } else {
            throw new Error("data must be declared at build time in dataSources!")
        }
    }
})

const dataSources = {
    async representantes() {
        // TODO: use github api
        const request = await fetch("https://raw.githubusercontent.com/solanto/cabildummy-datos/master/diputados.json")
        const data = await request.json()

        return data
    }
}

export default dataCache
