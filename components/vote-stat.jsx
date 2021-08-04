import styles from "../styles/vote-stat.module"

const VoteStat = ({ styleKey, className, children, asCustom: Component = "strong" }) =>
    <Component className={(styleKey ? styles[styleKey] : "") + (className ? ` ${className}`: "")}>{children}</Component>

export default VoteStat
