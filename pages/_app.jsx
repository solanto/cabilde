import "@trussworks/react-uswds/lib/index.css"
import "@trussworks/react-uswds/lib/uswds.css"
import Layout from "../components/layout" // TODO: move to layouts/app.jsx
import "../styles/globals"
import { MDXProvider } from "@mdx-js/react"
import Link from "../components/link"


const MDXComponents = {
  a: Link
}

const App = ({ Component, pageProps }) =>
  <MDXProvider components={MDXComponents}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </MDXProvider>

export default App
