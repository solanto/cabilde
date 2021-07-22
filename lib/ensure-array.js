export default function ensureArray(arrayOrScalar) {
    return [].concat(arrayOrScalar || [])
}
