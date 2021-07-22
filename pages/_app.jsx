import "../styles/globals"
import "@trussworks/react-uswds/lib/uswds.css"
import "@trussworks/react-uswds/lib/index.css"

import Layout from "../components/layout"

const App = ({ Component, pageProps }) =>
  <Layout>
    <Component {...pageProps} />
  </Layout>

export default App
