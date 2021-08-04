function percent(value) {
    return Math.round(value * 100)
}

export function voteCounts(votacion) {
    return Object.fromEntries(
        Object.entries(votacion)
            .map(([type, reps]) => [type, reps.length])
    )
}

export function voteRatios({ aFavor, enContra, abstenido }) {
    const total = aFavor + enContra + abstenido

    return {
        aFavor: aFavor / total,
        enContra: enContra / total,
        abstenido: abstenido / total
    }
}

export function votePercents({ aFavor, enContra, abstenido }) {
    return Object.fromEntries(
        Object.entries(voteRatios({ aFavor, enContra, abstenido }))
            .map(([type, count]) => [type, percent(count)])
    )
}

function divide(a, b) {
    return a / b
}

export function parseMajorityProportion(ratioString) {
    if (ratioString) {
        return Number(ratioString) || divide(...ratioString.split("/"))
    } else {
        return undefined
    }
}

export function votingStatus(votacion, mayoriaEspecial) {
    if ("aFavor" in votacion && "enContra" in votacion && "abstenido" in votacion) {
        if (voteRatios(votacion).aFavor > (parseMajorityProportion(mayoriaEspecial) || 1 / 2)) {
            return "aprobada"
        } else {
            return "rechazada"
        }
    } else {
        return "pendiente"
    }
}

export function toStyleKey(statusOrKey) {
    const options = {
        "aprobada": "a-favor",
        "rechazada": "en-contra",
        "aFavor": "a-favor",
        "enContra": "en-contra"
    }

    if (statusOrKey in options) {
        return options[statusOrKey]
    } else {
        return undefined
    }
}

export function byRep(votacion) {
    return Object.entries(votacion)
        .reduce((votes, [type, reps]) =>
            [
                ...reps.map(nombre => ({ nombre, votacionKey: type })),
                ...votes
            ],
            []
        )
}

export function renderVotacionKey(key) {
    const options = {
        "aFavor": "A favor",
        "enContra": "En contra",
        "abstenido": "Abstenido",
        "ausente": "Ausente"
    }

    if (key in options) {
        return options[key]
    } else {
        return undefined
    }
}
