import Head from "next/head";

const WithMaterialIcons = ({ children }) =>
    <>
        <Head>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round&display=block" rel="stylesheet" />
        </Head>

        {children}
    </>

export default WithMaterialIcons
