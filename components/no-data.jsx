import WithMaterialIcons from "./with-material-icons"
import styles from "../styles/no-data.module"

const NoData = ({ children = "Ningún dato encontrado." }) =>
    <WithMaterialIcons>
        <section className={styles["ningun-dato"]}>
            <span className={styles["ningun-dato__mensaje"]}>{children}</span>
        </section>
    </WithMaterialIcons>

export default NoData
