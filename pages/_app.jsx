import "@trussworks/react-uswds/lib/index.css"
import "@trussworks/react-uswds/lib/uswds.css"
import Layout from "../components/layout" // TODO: move to layouts/app.jsx
import "../styles/globals"
import { MDXProvider } from "@mdx-js/react"
import Link from "../components/link"
import ProgressBar from 'nextjs-progressbar';
import progressBarStyles from "../styles/progress-bar.module"


const MDXComponents = {
  a: Link
}

const App = ({ Component, pageProps }) =>
  <MDXProvider components={MDXComponents}>
    <ProgressBar
      color={progressBarStyles["progress-bar"]}
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
      options={{ showSpinner: false }}
    />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </MDXProvider>

export default App
