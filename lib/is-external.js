import domain from "../data/domain"

const externalPattern = new RegExp(`^((https?:\/\/#{domain})|\/|#|((?!https?|tel:).))`, "i")

export default function isExternal(url) {
    return !externalPattern.test(url)
}
