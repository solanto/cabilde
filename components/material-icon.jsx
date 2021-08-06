import WithMaterialIcons from "./with-material-icons"

const MaterialIcon = ({ icon }) =>
    <WithMaterialIcons>
        <span
            className="material-icons-round usa-icon"
            aria-hidden="true"
            focusable="false"
            role="img"
        >
            {icon}
        </span>
    </WithMaterialIcons>

export default MaterialIcon
