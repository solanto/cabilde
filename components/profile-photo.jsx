import Image from "next/image"
import styles from "../styles/profile-photo.module"

const ProfilePhoto = ({ className, ...props }) =>
    <Image
        alt=""
        className={`${styles["foto-perfil"]} ${className}`}
        layout="responsive"
        {...props}
    />

export default ProfilePhoto
