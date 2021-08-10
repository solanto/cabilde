import DocumentBase, { Html, Head, Main, NextScript } from "next/document"

class Document extends DocumentBase {
    static async getInitialProps(ctx) {
        const initialProps = await DocumentBase.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="es">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default Document
