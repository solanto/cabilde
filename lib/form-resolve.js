export default function formResolve({ url, redirect }, resolve) {
    if (redirect) {
        resolve.redirect(url)
    } else {
        resolve.body(url)
    }
}
