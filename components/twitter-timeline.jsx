
import Script from "next/script"

const TwitterTimeline = ({ handle, displayName }) =>
    <>
        <a className="twitter-timeline usa-link"
            href={`https://twitter.com/${handle}?ref_src=twsrc%5Etfw`}
            lang="es">
            Tweets por {displayName}
        </a>
        <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
    </>

export default TwitterTimeline
