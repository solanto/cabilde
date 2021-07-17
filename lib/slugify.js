import slugifier from "slugify"

const defaultOptions = {
    lower: true
}

export default function slugify(string, options = {}) {
    return slugifier(string, {
        ...defaultOptions,
        ...options
    })
}
